import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { off, onValue, ref } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { VictoryPie } from "victory-native";
import RelatorioPDF from "../../Components/RelatorioPDF";
import { DatePickerModal } from "../../Components/CustomModal";

const { width } = Dimensions.get("window");

export default function VolatilScreen() {
  const [coovPPB, setCoovPPB] = useState<number>(400);
  const [temperature, setTemperature] = useState<number>(26);
  const [humidity, setHumidity] = useState<number>(65);
  const [showModalPDF,setShowModalPDF] = useState(false);

  const getCoovColor = (ppb: number) => {
    if (ppb <= 800) return "#4CAF50";
    if (ppb <= 1200) return "#FFC107";
    if (ppb <= 2000) return "#FF9800";
    if (ppb <= 5000) return "#F44336";
    return "#B71C1C";
  };

  const getCoovQuality = (ppb: number) => {
    if (ppb <= 800) return "EXCELENTE";
    if (ppb <= 1200) return "BOA";
    if (ppb <= 2000) return "MODERADA";
    if (ppb <= 5000) return "RUIM";
    return "PÉSSIMA";
  };

  const getCoovDescription = (ppb: number) => {
    if (ppb <= 800) return "Níveis de gases voláteis excelentes. Ventilação adequada e ar fresco.";
    if (ppb <= 1200) return "Níveis de gases voláteis bons. O ambiente está bem ventilado.";
    if (ppb <= 2000) return "Níveis de gases voláteis moderados. Considere melhorar a ventilação.";
    if (ppb <= 5000) return "Níveis de gases voláteis altos. Ventile o ambiente imediatamente.";
    return "Níveis de gases voláteis perigosos. Evite permanecer no local.";
  };

  const getRecommendations = (ppb: number) => {
    if (ppb <= 800) return ["Ambiente bem ventilado", "Continue com a ventilação atual"];
    if (ppb <= 1200) return ["Bom nível de ventilação", "Abra janelas periodicamente"];
    if (ppb <= 2000) return ["Melhore a ventilação do ambiente", "Evite aglomerações no local"];
    if (ppb <= 5000) return ["Ventile o ambiente imediatamente", "Considere usar purificadores de ar"];
    return ["Abandone o local se possível", "Ventile intensamente o ambiente"];
  };
  const GeneratePDF = async(inicio:Date, fim:Date) =>{
      await RelatorioPDF({inicio, fim});
    }

  useEffect(() => {
    const outrosParametrosRef = ref(database, "/OutrosParametros");
    
    const onOutrosParametrosChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setCoovPPB(data.CCOV || 400);
        setTemperature(data.Temperatura || null);
        setHumidity(data.Umidade || 65);
      }
    };

    onValue(outrosParametrosRef, onOutrosParametrosChange);
    
    return () => {
      off(outrosParametrosRef, "value", onOutrosParametrosChange);
    };
  }, []);

  const coovColor = getCoovColor(coovPPB);
  const pieSize = Math.min(width * 0.6, 280);
  const recommendations = getRecommendations(coovPPB);

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={[styles.header, { backgroundColor: coovColor }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image 
          source={require("../../../assets/LogoBranca.png")} 
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>Gases Voláteis</Text>
        <Text style={styles.headerSubtitle}>Concentração em partes por bilhão</Text>
      </View>

      {/* Card principal */}
      <View style={styles.qualityCard}>
        <View style={styles.qualityIndicator}>
          <Text style={[styles.qualityValue, { color: coovColor }]}>
            {coovPPB.toFixed(0)} ppb
          </Text>
          <Text style={styles.qualityLabel}>Concentração de COV</Text>
          
          <View style={styles.qualityMeter}>
            <View style={[styles.meterFill, { 
              width: `${Math.min(100, (coovPPB / 2000) * 100)}%`,
              backgroundColor: coovColor 
            }]} />
          </View>
          
          <Text style={[styles.qualityStatus, { color: coovColor }]}>
            {getCoovQuality(coovPPB)}
          </Text>
        </View>

        <View style={styles.qualityDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Temperatura</Text>
            <Text style={styles.detailValue}>{temperature}°C</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Umidade</Text>
            <Text style={styles.detailValue}>{humidity}%</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Variação Diária</Text>
            <Text style={styles.detailValue}>±150 ppb</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Média Mensal</Text>
            <Text style={styles.detailValue}>850 ppb</Text>
          </View>
        </View>
      </View>

      {/* Gráfico de pizza */}
      <View style={styles.pieContainer}>
        <VictoryPie
          data={[
            { x: "COV", y: coovPPB },
            { x: "Ar limpo", y: Math.max(0, 2000 - coovPPB) },
          ]}
          innerRadius={pieSize * 0.4}
          padAngle={2}
          cornerRadius={8}
          animate={{ duration: 1000 }}
          colorScale={[coovColor, "rgba(200, 230, 240, 0.2)"]}
          width={pieSize}
          height={pieSize}
          style={{ labels: { fill: "transparent" } }}
        />
        <View style={styles.pieCenterLabel}>
          <Text style={[styles.pieCenterText, { color: coovColor }]}>
            {getCoovQuality(coovPPB)}
          </Text>
          <Text style={styles.pieCenterSubtext}>{coovPPB.toFixed(0)} ppb</Text>
        </View>
      </View>

      {/* Relatório */}
      <View style={styles.reportSection}>
        <Text style={styles.sectionTitle}>Análise de Qualidade do Ar</Text>
        <View style={styles.reportCard}>
          <Text style={styles.reportText}>
            {getCoovDescription(coovPPB)}
          </Text>
        </View>
      </View>

      {/* Recomendações */}
      <View style={styles.recommendations}>
        <Text style={styles.sectionTitle}>Recomendações</Text>
        {recommendations.map((rec, index) => (
          <View key={index} style={styles.tipCard}>
            <Ionicons 
              name="filter" 
              size={24} 
              color={coovPPB > 1200 ? "#F44336" : "#4CAF50"} 
            />
            <Text style={styles.tipText}>{rec}</Text>
          </View>
        ))}
      </View>

      {/* Localização */}
      <View style={styles.locationInfo}>
        <MaterialIcons name="location-on" size={20} color="#607D8B" />
        <Text style={styles.locationText}>
          São Paulo, SP • Atualizado às {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Text>
      </View>

      {/* Botão */}
      <TouchableOpacity style={[styles.generateButton, { backgroundColor: coovColor }]}  onPress={()=>setShowModalPDF(true)}>
        <Text style={styles.buttonText}>Ver Histórico Completo</Text>
      </TouchableOpacity>
      <DatePickerModal
                visible={showModalPDF}
                onClose={()=> setShowModalPDF(false)}
                onGenerate={GeneratePDF}
                />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 30,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  qualityCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 25,
  },
  qualityIndicator: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qualityValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  qualityLabel: {
    fontSize: 16,
    color: '#607D8B',
    marginBottom: 10,
    textAlign: 'center',
  },
  qualityMeter: {
    height: 10,
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    borderRadius: 5,
  },
  qualityStatus: {
    fontSize: 18,
    fontWeight: '600',
  },
  qualityDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#607D8B',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
  },
  pieContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  pieCenterLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieCenterText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pieCenterSubtext: {
    fontSize: 16,
    color: '#607D8B',
  },
  reportSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  reportCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#455A64',
    textAlign: 'center',
  },
  recommendations: {
    marginBottom: 25,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#455A64',
    flex: 1,
  },
  locationInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  locationText: {
    fontSize: 14,
    color: '#607D8B',
    marginLeft: 5,
  },
  generateButton: {
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});