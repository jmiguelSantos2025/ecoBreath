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
import { Ionicons, MaterialIcons, FontAwesome, Feather, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { off, onValue, ref } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { VictoryPie } from "victory-native";
import { DatePickerModal } from "../../Components/CustomModal";
import RelatorioPDF from "../../Components/RelatorioPDF";

const { width } = Dimensions.get("window");

export default function Co2Screen() {
  const [co2PPM, setCo2PPM] = useState<number>(400);
  const [temperature, setTemperature] = useState<number>(26);
  const [humidity, setHumidity] = useState<number>(65);
  const [showModalPDF,setShowModalPDF] = useState(false);
  const [co, setCo] = useState<number>(0);

  const getCO2Color = (ppm: number) => {
    if (ppm <= 800) return "#13D8B0";
    if (ppm <= 1200) return "#FFC107";
    if (ppm <= 2000) return "#FF9800";
    if (ppm <= 5000) return "#F44336";
    return "#B71C1C";
  };

  const getCO2Quality = (ppm: number) => {
    if (ppm <= 800) return "Excelente";
    if (ppm <= 1200) return "Boa";
    if (ppm <= 2000) return "Moderada";
    if (ppm <= 5000) return "Ruim";
    return "Péssima";
  };

  const getCO2Description = (ppm: number) => {
    if (ppm <= 800) return "Níveis de CO₂ excelentes. Ventilação adequada e ar fresco.";
    if (ppm <= 1200) return "Níveis de CO₂ bons. O ambiente está bem ventilado.";
    if (ppm <= 2000) return "Níveis de CO₂ moderados. Considere melhorar a ventilação.";
    if (ppm <= 5000) return "Níveis de CO₂ altos. Ventile o ambiente imediatamente.";
    return "Níveis de CO₂ perigosos. Evite permanecer no local.";
  };

  const getRecommendations = (ppm: number) => {
    if (ppm <= 800) return ["Continue com a ventilação atual", "Ambiente bem ventilado"];
    if (ppm <= 1200) return ["Abra janelas periodicamente", "Bom nível de ventilação"];
    if (ppm <= 2000) return ["Melhore a ventilação do ambiente", "Evite aglomerações"];
    if (ppm <= 5000) return ["Ventile o ambiente imediatamente", "Use purificadores de ar"];
    return ["Abandone o local se possível", "Ventile intensamente"];
  };
  const GeneratePDF = async(inicio:Date, fim:Date) =>{
      await RelatorioPDF({inicio, fim});
    }

  useEffect(() => {
    const TempeUmidRef = ref(database, "/TempeUmid");
    const outrosDadosRef = ref(database, "/SensoresPPM");
    
    const onSensoresChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        setTemperature(data.Temperatura || null);
        setHumidity(data.Umidade || 0);
      }
    };
    const onOtherDataChange = (snapshot1: any) => {
     
      if (snapshot1.exists()) {
        const data = snapshot1.val();
        const co = data.CO || 0
        setCo2PPM(data.CO2Out || 0);
        setCo(co);
      }
    };

    onValue(TempeUmidRef, onSensoresChange);
    onValue(outrosDadosRef, onOtherDataChange);
    
    return () => {
      off(TempeUmidRef, "value", onSensoresChange);
      off(outrosDadosRef, "value", onOtherDataChange);
    };
  }, []);

  const co2Color = getCO2Color(co2PPM);
  const pieSize = Math.min(width * 0.6, 280);
  const recommendations = getRecommendations(co2PPM);

  return (
    <ScrollView style={styles.container}>
    
      <View style={[styles.header, { backgroundColor: co2Color }]}>
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
        <View style={styles.headerIconContainer}>
         
          <Text style={styles.headerTitle}>Monitoramento de CO₂</Text>
        </View>
        <Text style={styles.headerSubtitle}>Concentração em partes por milhão</Text>
      </View>

      <View style={styles.qualityCard}>
        <View style={styles.qualityIndicator}>
          <View style={styles.qualityValueContainer}>
            
            <Text style={[styles.qualityValue, { color: co2Color }]}>
              {co2PPM.toFixed(0)} ppm
            </Text>
          </View>
          <Text style={styles.qualityLabel}>Concentração de CO₂</Text>
          
          <View style={styles.qualityMeter}>
            <View style={[styles.meterFill, { 
              width: `${Math.min(100, (co2PPM / 2000) * 100)}%`,
              backgroundColor: co2Color 
            }]} />
          </View>
          
          <Text style={[styles.qualityStatus, { color: co2Color }]}>
            {getCO2Quality(co2PPM)}
          </Text>
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
              <FontAwesome5 name="water" size={20} color="#607D8B" />
              <Text style={styles.detailLabel}>Umidade</Text>
            </View>
            <Text style={styles.detailValue}>{humidity.toFixed(0)}%</Text>
          </View>
          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <MaterialCommunityIcons name="weather-windy" size={20} color="#607D8B" />
              <Text style={styles.detailLabel}>Sensação Térmica</Text>
            </View>
            <Text style={styles.detailValue}>{`${(temperature+2).toFixed(1)}°C`}</Text>
          </View>
          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <MaterialCommunityIcons name="molecule" size={20} color="#607D8B" />
              <Text style={styles.detailLabel}>Níveis de CO</Text>
            </View>
            <Text style={styles.detailValue}>{co} ppm</Text>
          </View>
        </View>
      </View>

      <View style={styles.pieContainer}>
        <VictoryPie
          data={[
            { x: "CO₂", y: co2PPM },
            { x: "Ar limpo", y: Math.max(0, 2000 - co2PPM) },
          ]}
          innerRadius={pieSize * 0.4}
          padAngle={2}
          cornerRadius={8}
          animate={{ duration: 1000 }}
          colorScale={[co2Color, "rgba(200, 230, 240, 0.2)"]}
          width={pieSize}
          height={pieSize}
          style={{ labels: { fill: "transparent" } }}
        />
        <View style={styles.pieCenterLabel}>
          
          <Text style={[styles.pieCenterText, { color: co2Color }]}>
            {getCO2Quality(co2PPM)}
          </Text>
          <Text style={styles.pieCenterSubtext}>{co2PPM.toFixed(0)} ppm</Text>
        </View>
      </View>

      <View style={styles.reportSection}>
        <View style={styles.sectionHeader}>
          <Feather name="bar-chart-2" size={24} color="#37474F" />
          <Text style={styles.sectionTitle}>Análise de CO₂</Text>
        </View>
        <View style={styles.reportCard}>
          <Text style={styles.reportText}>
            {getCO2Description(co2PPM)}
          </Text>
        </View>
      </View>

      <View style={styles.recommendations}>
        <View style={styles.sectionHeader}>
          <Ionicons name="bulb-outline" size={24} color="#37474F" />
          <Text style={styles.sectionTitle}>Recomendações</Text>
        </View>
        {recommendations.map((rec, index) => (
          <View key={index} style={styles.tipCard}>
            <Ionicons 
              name="bulb" 
              size={24} 
              color={co2PPM > 1200 ? "#F44336" : "#13D8B0"} 
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
        style={[styles.generateButton, { backgroundColor: co2Color }]} 
        onPress={()=>setShowModalPDF(true)}
      >
        <MaterialIcons name="history" size={24} color="white" />
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
  headerIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginLeft: 10,
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
  },
  detailIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: '#607D8B',
    marginLeft: 5,
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
    marginVertical: 5,
  },
  pieCenterSubtext: {
    fontSize: 16,
    color: '#607D8B',
  },
  reportSection: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#37474F',
    marginLeft: 10,
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