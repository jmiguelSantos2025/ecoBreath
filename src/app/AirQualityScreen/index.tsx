import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { off, onValue, ref } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { VictoryPie } from "victory-native";
import * as Haptics from 'expo-haptics';

export default function AirQualityScreen() {
  const [volatilePPM, setVolatilePPM] = useState<number>(200);
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const outrosParametrosRef = ref(database, "/OutrosParametros");
    
    const onOutrosParametrosChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newPPM = data.CCOV || 0;
        setVolatilePPM(newPPM);
        
        
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
        
       
        if (Math.abs(newPPM - volatilePPM) > 500) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    };

    onValue(outrosParametrosRef, onOutrosParametrosChange);
    
    return () => {
      off(outrosParametrosRef, "value", onOutrosParametrosChange);
    };
  }, []);

  const getAirColor = (ppm: number) => {
    if (ppm <= 800) return "#13D8B0";    
    if (ppm <= 1200) return "#FFC107";   
    if (ppm <= 2000) return "#FF9800";   
    if (ppm <= 5000) return "#F44336";  
    return "#B71C1C";                    
  };

  const getAirQualityText = (ppm: number) => {
    if (ppm <= 800) return "Excelente";
    if (ppm <= 1200) return "Boa";
    if (ppm <= 2000) return "Moderada";
    if (ppm <= 5000) return "Ruim";
    return "Péssima";
  };

  const getAirQualityDescription = (ppm: number) => {
    if (ppm <= 800) 
      return "A qualidade do ar é excelente. Condições ideais para atividades ao ar livre.";
    if (ppm <= 1200) 
      return "A qualidade do ar é boa. A maioria das pessoas não será afetada.";
    if (ppm <= 2000) 
      return "Qualidade do ar moderada. Pessoas sensíveis podem apresentar desconforto.";
    if (ppm <= 5000) 
      return "Qualidade do ar ruim. Considere reduzir atividades prolongadas ao ar livre.";
    return "Qualidade do ar péssima. Evite atividades ao ar livre, especialmente grupos sensíveis.";
  };

  const getRecommendations = (ppm: number) => {
    if (ppm <= 800) return [
      "Aproveite para atividades ao ar livre",
      "Mantenha os ambientes ventilados"
    ];
    if (ppm <= 1200) return [
      "Bom momento para caminhadas ao ar livre",
      "Considere usar purificadores de ar em ambientes fechados"
    ];
    if (ppm <= 2000) return [
      "Reduza exercícios intensos ao ar livre",
      "Use máscara se for sensível a poluentes"
    ];
    if (ppm <= 5000) return [
      "Evite atividades prolongadas ao ar livre",
      "Mantenha janelas fechadas em horários de pico"
    ];
    return [
      "Evite qualquer atividade ao ar livre",
      "Use máscara de proteção se precisar sair",
      "Considere usar purificador de ar"
    ];
  };

  const pieSize = Math.min(Dimensions.get("window").width * 0.7, 300);
  const airColor = getAirColor(volatilePPM);
  const qualityText = getAirQualityText(volatilePPM);
  const recommendations = getRecommendations(volatilePPM);
   const showWarningIcon = volatilePPM > 2000;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
 
      <View style={[styles.header, { backgroundColor: airColor }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => {
            Haptics.selectionAsync();
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.airIconContainer}>
            { showWarningIcon?
            (<Ionicons 
              name={"warning"} 
              size={40} 
              color="white" 
            />)
            : (<Image
            source={require("../../../assets/LogoBranca.png")}
            style={styles.logoInsideCircle}
            resizeMode="contain"
            />)
            }
          </View>
          <Text style={styles.headerTitle}>Qualidade do Ar</Text>
          <Text style={styles.headerSubtitle}>Monitoramento em tempo real</Text>
        </View>
      </View>

     
      <Animated.View 
        style={[
          styles.qualityCard, 
          { 
            transform: [{ scale: scaleAnim }],
            borderTopColor: airColor,
          }
        ]}
      >
        <View style={styles.qualityIndicator}>
          <Text style={[styles.qualityValue, { color: airColor }]}>
            {volatilePPM.toFixed(0)} ppb
          </Text>
          <Text style={styles.qualityLabel}>Concentração de COVs</Text>
          
          <View style={styles.qualityMeter}>
            <View style={[
              styles.meterFill, 
              {
                width: `${Math.min(100, (volatilePPM/6000)*100)}%`, 
                backgroundColor: airColor,
              }
            ]} />
            <View style={[styles.meterMarker, { left: '13%' }]} />
            <View style={[styles.meterMarker, { left: '20%' }]} />
            <View style={[styles.meterMarker, { left: '33%' }]} />
            <View style={[styles.meterMarker, { left: '83%' }]} />
          </View>
          
          <View style={styles.qualityStatusContainer}>
            <Ionicons 
              name="speedometer" 
              size={24} 
              color={airColor} 
              style={styles.statusIcon}
            />
            <Text style={[styles.qualityStatus, { color: airColor }]}>
              {qualityText}
            </Text>
          </View>
        </View>
      </Animated.View>

      
      <View style={styles.pieContainer}>
        <VictoryPie
          data={[
            { x: "Poluentes", y: volatilePPM },
            { x: "Ar limpo", y: Math.max(0, 6000 - volatilePPM) },
          ]}
          innerRadius={pieSize * 0.5}
          padAngle={2}
          cornerRadius={8}
          animate={{ duration: 1000 }}
          colorScale={[airColor, "rgba(200, 230, 240, 0.5)"]}
          width={pieSize}
          height={pieSize}
          style={{
            labels: { fill: "transparent" }
          }}
        />
        <View style={styles.pieCenterLabel}>
          <Text style={[styles.pieCenterText, { color: airColor }]}>
            {qualityText}
          </Text>
          <Text style={styles.pieCenterSubtext}>
            {volatilePPM.toFixed(0)} ppb
          </Text>
        </View>
      </View>

      
      <View style={styles.referenceSection}>
        <Text style={styles.sectionTitle}>Índice de Qualidade do Ar (IQA)</Text>
        <View style={styles.referenceScale}>
          <View style={[styles.referenceItem, { backgroundColor: '#4CAF50' }]}>
            <Text style={styles.referenceText}>0-800</Text>
            <Text style={styles.referenceLabel}>Excelente</Text>
          </View>
          <View style={[styles.referenceItem, { backgroundColor: '#FFC107' }]}>
            <Text style={styles.referenceText}>801-1200</Text>
            <Text style={styles.referenceLabel}>Boa</Text>
          </View>
          <View style={[styles.referenceItem, { backgroundColor: '#FF9800' }]}>
            <Text style={styles.referenceText}>1201-2000</Text>
            <Text style={styles.referenceLabel}>Moderada</Text>
          </View>
          <View style={[styles.referenceItem, { backgroundColor: '#F44336' }]}>
            <Text style={styles.referenceText}>2001-5000</Text>
            <Text style={styles.referenceLabel}>Ruim</Text>
          </View>
          <View style={[styles.referenceItem, { backgroundColor: '#B71C1C' }]}>
            <Text style={styles.referenceText}>5000+</Text>
            <Text style={styles.referenceLabel}>Péssima</Text>
          </View>
        </View>
      </View>

   
      <View style={styles.reportSection}>
        <View style={styles.sectionHeader}>
          <Ionicons name="document-text" size={24} color="#37474F" />
          <Text style={styles.sectionTitle}>Análise da Qualidade do Ar</Text>
        </View>
        <View style={styles.reportCard}>
          <Text style={styles.reportText}>
            {getAirQualityDescription(volatilePPM)}
          </Text>
        </View>
      </View>

    
      <View style={styles.recommendations}>
        <View style={styles.sectionHeader}>
          <Ionicons name="bulb" size={24} color="#37474F" />
          <Text style={styles.sectionTitle}>Recomendações</Text>
        </View>
        
        {recommendations.map((rec, index) => (
          <View 
            key={index} 
            style={[
              styles.tipCard,
              volatilePPM > 2000 && styles.alertTipCard
            ]}
          >
            <Ionicons 
              name="checkmark-circle" 
              size={24} 
              color={volatilePPM > 2000 ? "#F44336" : "#4CAF50"} 
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
        style={[styles.actionButton, { backgroundColor: airColor }]}
        onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
      >
        <Text style={styles.buttonText}>Histórico de Qualidade do Ar</Text>
        <Ionicons name="stats-chart" size={20} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 10,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  headerContent: {
    alignItems: 'center',
    width: '100%',
  },
  airIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  qualityCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 25,
    borderTopWidth: 6,
  },
  qualityIndicator: {
    alignItems: 'center',
  },
  logoInsideCircle: {
    width: 50,
    height: 50,
  },
  qualityValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  qualityLabel: {
    fontSize: 16,
    color: '#607D8B',
    marginBottom: 20,
  },
  qualityMeter: {
    height: 12,
    width: '100%',
    backgroundColor: '#ECEFF1',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  meterFill: {
    height: '100%',
    borderRadius: 10,
  },
  meterMarker: {
    position: 'absolute',
    height: '100%',
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  qualityStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusIcon: {
    marginRight: 10,
  },
  qualityStatus: {
    fontSize: 22,
    fontWeight: '600',
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
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  pieCenterLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieCenterText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pieCenterSubtext: {
    fontSize: 16,
    color: '#607D8B',
  },
  referenceSection: {
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
  referenceScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  referenceItem: {
    flex: 1,
    marginHorizontal: 2,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  referenceText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  referenceLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
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
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  reportText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#455A64',
  },
  recommendations: {
    marginBottom: 25,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  alertTipCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  tipText: {
    fontSize: 15,
    marginLeft: 12,
    color: '#455A64',
    flex: 1,
    lineHeight: 22,
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
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
});