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
import { Ionicons, MaterialIcons, FontAwesome, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { off, onValue, ref } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { VictoryPie } from "victory-native";
import RelatorioPDF from "../../Components/RelatorioPDF";
import { DatePickerModal } from "../../Components/CustomModal";

const { width } = Dimensions.get("window");

export default function VolatilScreen() {
  const [coovPPB, setCoovPPB] = useState<number>(400);
  const [temperature, setTemperature] = useState(26);
  const [humidity, setHumidity] = useState<number>(0);
  const [co, setCo] = useState<number>(0);
  const [showModalPDF,setShowModalPDF] = useState(false);

  const getCoovColor = (ppb: number) => {
    if (ppb <= 800) return "#13D8B0";
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
  
  const GeneratePDF = async(inicio:Date, fim:Date) => {
    await RelatorioPDF({inicio, fim});
  }

  useEffect(() => {
    const outrosParametrosRef = ref(database, "/OutrosParametros");
    const tempeUmidRef = ref(database, "/TempeUmid");
    const outrosDadosRef = ref(database, "/SensoresPPM");
    
    const onOutrosParametrosChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setCoovPPB(data.CCOV || 0);
        setCo(data.CO || 0);
      }
    };
    
    const onTempeUmidChange = (snapshot1: any) => {
      if (snapshot1.exists()) {
        const data = snapshot1.val();
        setTemperature(data.Temperatura || "Sem dados em ");
        setHumidity(data.Umidade || 0);
      }
    };
    
    const onOtherDataChange = (snapshot1: any) => {
      if (snapshot1.exists()) {
        const data = snapshot1.val();
        const co = data.CO || 0
        setCo(co);
      }
    };

    onValue(outrosParametrosRef, onOutrosParametrosChange);
    onValue(tempeUmidRef, onTempeUmidChange);
    onValue(outrosDadosRef, onOtherDataChange);
    
    return () => {
      off(outrosParametrosRef, "value", onOutrosParametrosChange);
      off(tempeUmidRef, "value", onTempeUmidChange);
      off(outrosDadosRef, "value", onOtherDataChange);
    };
  }, []);

  const coovColor = getCoovColor(coovPPB);
  const pieSize = Math.min(width * 0.6, 280);
  const recommendations = getRecommendations(coovPPB);

  return (
    <ScrollView style={styles.container}>
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
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Gases Voláteis</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerSubtitle}>Concentração em partes por bilhão</Text>
        </View>
      </View>

      <View style={styles.qualityCard}>
        <View style={styles.qualityIndicator}>
          <View style={styles.qualityValueContainer}>
            <Text style={[styles.qualityValue, { color: coovColor }]}>
              {coovPPB.toFixed(0)} ppb
            </Text>
          </View>
          <Text style={styles.qualityLabel}>Concentração de CCOV</Text>
          
          <View style={styles.qualityMeter}>
            <View style={[styles.meterFill, { 
              width: `${Math.min(100, (coovPPB / 2000) * 100)}%`,
              backgroundColor: coovColor 
            }]} />
          </View>
          
          <View style={styles.qualityStatusContainer}>
            <Text style={[styles.qualityStatus, { color: coovColor }]}>
              {getCoovQuality(coovPPB)}
            </Text>
          </View>
        </View>

        <View style={styles.qualityDetails}>
          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <FontAwesome name="thermometer-half" size={20} color="#607D8B" />
              <Text style={styles.detailLabel}>Temperatura</Text>
            </View>
            <Text style={styles.detailValue}>{temperature}°C</Text>
          </View>
          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <FontAwesome name="tint" size={20} color="#607D8B" />
              <Text style={styles.detailLabel}>Umidade</Text>
            </View>
            <Text style={styles.detailValue}>{humidity.toFixed(0)}%</Text>
          </View>
          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <MaterialCommunityIcons name="molecule-co" size={20} color="#607D8B" />
              <Text style={styles.detailLabel}>Níveis de CO</Text>
            </View>
            <Text style={styles.detailValue}>{co} ppm</Text>
          </View>
          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <MaterialCommunityIcons name="weather-windy" size={20} color="#607D8B" />
              <Text style={styles.detailLabel}>Sensação Térmica</Text>
            </View>
            <Text style={styles.detailValue}>{temperature+2}°C</Text>
          </View>
        </View>
      </View>

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

      <View style={styles.reportSection}>
        <View style={styles.sectionTitleContainer}>
          <Feather name="bar-chart-2" size={20} color="#37474F" />
          <Text style={styles.sectionTitle}>Análise de Qualidade do Ar</Text>
        </View>
        <View style={styles.reportCard}>
          <View style={styles.reportTextContainer}>
            <MaterialIcons name="info" size={20} color="#455A64" style={styles.reportIcon} />
            <Text style={styles.reportText}>
              {getCoovDescription(coovPPB)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.recommendations}>
        <View style={styles.sectionTitleContainer}>
          <Feather name="alert-triangle" size={20} color="#37474F" />
          <Text style={styles.sectionTitle}>Recomendações</Text>
        </View>
        {recommendations.map((rec, index) => (
          <View key={index} style={styles.tipCard}>
            <Ionicons 
              name={index === 0 ? "leaf" : "bulb"} 
              size={24} 
              color={coovPPB > 1200 ? "#F44336" : "#13D8B0"} 
            />
            <Text style={styles.tipText}>{rec}</Text>
          </View>
        ))}
      </View>

      <View style={styles.locationInfo}>
        <MaterialIcons name="location-on" size={20} color="#607D8B" />
        <Text style={styles.locationText}>
          Manaus, AM • Atualizado às {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Text>
      </View>

      <TouchableOpacity 
        style={[styles.generateButton, { backgroundColor: coovColor }]}  
        onPress={() => setShowModalPDF(true)}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="history" size={24} color="white" />
          <Text style={styles.buttonText}>Ver Histórico Completo</Text>
        </View>
      </TouchableOpacity>
      
      <DatePickerModal
        visible={showModalPDF}
        onClose={() => setShowModalPDF(false)}
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
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
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
  qualityValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueIcon: {
    marginRight: 10,
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
  qualityStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 8,
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
  detailIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: '#607D8B',
    marginLeft: 8,
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
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#37474F',
    marginLeft: 8,
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
  reportTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reportIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  reportText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#455A64',
    flex: 1,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});