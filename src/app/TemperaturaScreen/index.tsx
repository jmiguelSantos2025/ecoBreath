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

export default function TemperaturaScreen() {
  const [temp, setTemp] = useState<number>(24);
  const [humidity, setHumidity] = useState<number>(65);
  const [heatIndex, setHeatIndex] = useState<number>(26);
  const [showModalPDF,setShowModalPDF] = useState(false);

  const getTempColor = (temp: number) => {
    if (temp < 20) return "#00BFFF";
    if (temp < 23) return "#1E90FF"; 
    if (temp < 26) return "#32CD32"; 
    if (temp < 30) return "#13D8B0"; 
    if (temp > 30) return "#FF6347";
    return "#FF4500"; 
  };

  const getTempQuality = (temp: number) => {
    if (temp < 20) return "FRIO";
    if (temp < 23) return "FRESCO";
    if (temp < 26) return "AMENO";
    if (temp < 28) return "MORNO";
    if (temp < 30) return "QUENTE";
    return "MUITO QUENTE";
  };

  const getTempDescription = (temp: number) => {
    if (temp < 20) return "Temperatura baixa. Considere usar roupas mais quentes para maior conforto térmico.";
    if (temp < 23) return "Temperatura fresca e agradável. Condições ideais para atividades ao ar livre.";
    if (temp < 26) return "Temperatura amena e confortável. Excelente para a maioria das atividades.";
    if (temp < 28) return "Temperatura morna. Mantenha-se hidratado e evite exposição prolongada ao sol.";
    if (temp < 30) return "Temperatura elevada. Reduza atividades intensas e procure locais ventilados.";
    return "Temperatura muito alta. Evite exposição direta ao sol e mantenha-se hidratado.";
  };

  const getRecommendations = (temp: number) => {
    if (temp < 20) return ["Use roupas mais quentes", "Mantenha ambientes fechados"];
    if (temp < 23) return ["Aproveite para atividades ao ar livre", "Ventile ambientes periodicamente"];
    if (temp < 26) return ["Condições ideais para trabalho", "Mantenha ventilação natural"];
    if (temp < 28) return ["Use roupas leves", "Beba bastante água"];
    if (temp < 30) return ["Evite atividades ao ar livre", "Use protetor solar"];
    return ["Evite sair nos horários mais quentes", "Mantenha-se hidratado", "Use roupas leves e claras"];
  };

  const GeneratePDF = async(inicio:Date, fim:Date) => {
    await RelatorioPDF({inicio, fim});
  }

  useEffect(() => {
    const temperaturaRef = ref(database, "/TempeUmid");
    
    const onTemperaturaChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newTemp = data.Temperatura || 24;
        const newHumidity = data.Umidade || 65;
        
        setTemp(newTemp);
        setHumidity(newHumidity);
        setHeatIndex(newTemp + (newHumidity / 100) * 5);
      }
    };

    onValue(temperaturaRef, onTemperaturaChange);
    
    return () => {
      off(temperaturaRef, "value", onTemperaturaChange);
    };
  }, []);

  const tempColor = getTempColor(temp);
  const pieSize = Math.min(width * 0.6, 280);
  const recommendations = getRecommendations(temp);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho */}
      <View style={[styles.header, { backgroundColor: tempColor }]}>
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
        <Text style={styles.headerTitle}>Monitoramento de Temperatura</Text>
        <Text style={styles.headerSubtitle}>Temperatura ambiente em tempo real</Text>
      </View>

      {/* Card de Qualidade */}
      <View style={styles.qualityCard}>
        <View style={styles.qualityIndicator}>
          <View style={styles.qualityHeader}>
            <MaterialIcons name="device-thermostat" size={28} color={tempColor} />
            <Text style={[styles.qualityValue, { color: tempColor }]}>
              {temp.toFixed(1)}°C
            </Text>
          </View>
          <Text style={styles.qualityLabel}>Temperatura Atual</Text>
          
          <View style={styles.qualityMeter}>
            <View style={[styles.meterFill, { 
              width: `${Math.min(100, (temp / 40) * 100)}%`,
              backgroundColor: tempColor 
            }]} />
          </View>
          
          <Text style={[styles.qualityStatus, { color: tempColor }]}>
            {getTempQuality(temp)}
          </Text>
        </View>

        <View style={styles.qualityDetails}>
          <View style={styles.detailItem}>
            <MaterialIcons name="water-drop" size={20} color="#607D8B" />
            <Text style={styles.detailLabel}>Umidade</Text>
            <Text style={styles.detailValue}>{humidity}%</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="whatshot" size={20} color="#607D8B" />
            <Text style={styles.detailLabel}>Sensação Térmica</Text>
            <Text style={styles.detailValue}>{heatIndex.toFixed(1)}°C</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="trending-up" size={20} color="#607D8B" />
            <Text style={styles.detailLabel}>Variação Diária</Text>
            <Text style={styles.detailValue}>±2.5°C</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="calendar-today" size={20} color="#607D8B" />
            <Text style={styles.detailLabel}>Média Mensal</Text>
            <Text style={styles.detailValue}>24.8°C</Text>
          </View>
        </View>
      </View>

      {/* Gráfico */}
      <View style={styles.pieContainer}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="insert-chart" size={24} color="#37474F" />
          <Text style={styles.sectionTitle}>Análise Gráfica</Text>
        </View>
        <VictoryPie
          data={[
            { x: "Atual", y: temp },
            { x: "Ideal", y: Math.max(0, 26 - temp) },
          ]}
          innerRadius={pieSize * 0.4}
          padAngle={2}
          cornerRadius={8}
          animate={{ duration: 1000 }}
          colorScale={[tempColor, "rgba(200, 230, 240, 0.2)"]}
          width={pieSize}
          height={pieSize}
          style={{ labels: { fill: "transparent" } }}
        />
        <View style={styles.pieCenterLabel}>
          <Text style={[styles.pieCenterText, { color: tempColor }]}>
            {getTempQuality(temp)}
          </Text>
          <Text style={styles.pieCenterSubtext}>{temp.toFixed(1)}°C</Text>
        </View>
      </View>

      {/* Análise Térmica */}
      <View style={styles.reportSection}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="analytics" size={24} color="#37474F" />
          <Text style={styles.sectionTitle}>Análise Térmica</Text>
        </View>
        <View style={styles.reportCard}>
          <Text style={styles.reportText}>
            {getTempDescription(temp)}
          </Text>
        </View>
      </View>

      {/* Recomendações */}
      <View style={styles.recommendations}>
        <View style={styles.sectionHeader}>
          <Ionicons name="bulb" size={24} color="#37474F" />
          <Text style={styles.sectionTitle}>Recomendações</Text>
        </View>
        {recommendations.map((rec, index) => (
          <View key={index} style={styles.tipCard}>
            <Ionicons 
              name="thermometer" 
              size={24} 
              color={temp > 26 ? "#FF6347" : "#1E90FF"} 
            />
            <Text style={styles.tipText}>{rec}</Text>
          </View>
        ))}
      </View>

      {/* Localização */}
      <View style={styles.locationInfo}>
        <MaterialIcons name="location-on" size={20} color="#607D8B" />
        <Text style={styles.locationText}>
          Manaus, AM • Atualizado às {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Text>
      </View>

      {/* Botão de Histórico */}
      <TouchableOpacity 
        style={[styles.generateButton, { backgroundColor: tempColor }]} 
        onPress={() => setShowModalPDF(true)}
      >
        <MaterialIcons name="history" size={24} color="white" />
        <Text style={styles.buttonText}>Ver Histórico Completo</Text>
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
  qualityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qualityIndicator: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qualityValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginLeft: 10,
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
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#607D8B',
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
    textAlign: 'center',
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#37474F',
    marginLeft: 10,
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
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginLeft: 10,
  },
});