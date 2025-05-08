import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  useWindowDimensions,
  ScrollView,
  Dimensions,
} from "react-native";
import { IconButton } from "react-native-paper";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryPie,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
} from "victory-native";
import { onValue, ref } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { router } from "expo-router";
import { Defs, LinearGradient, Stop } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export default function VolatilScreen() {
  const { width, height } = useWindowDimensions();
  const [gasPPM, setGasPPM] = useState<number>(0);
  const [gasHistory, setGasHistory] = useState<{ x: number; y: number }[]>([]);

  // Cores baseadas nos níveis de gás
  const getGasColor = (ppm: number) => {
    if (ppm < 800) return "#4CAF50";    // Verde
    if (ppm < 1200) return "#FFC107";   // Amarelo
    if (ppm < 2000) return "#FF9800";   // Laranja
    return "#F44336";                   // Vermelho
  };

  // Classificação da qualidade do ar
  const AirQuality = (ppm: number) => {
    if (ppm < 800) return "EXCELENTE";
    if (ppm < 1200) return "BOA";
    if (ppm < 2000) return "MODERADA";
    if (ppm < 5000) return "RUIM";
    return "PÉSSIMA";
  };

  // Formata o tempo para HH:MM
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const dbRef = ref(database, "SensoresPPM");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Soma todos os gases voláteis
        const totalVolatiles = 
          (data.C2H50H || 0) + 
          (data.CH4 || 0) + 
          (data.CO || 0) + 
          (data.H2 || 0) + 
          (data.HN3 || 0) + 
          (data.NO2 || 0);
        
        setGasPPM(totalVolatiles);

        const now = Date.now();
        setGasHistory((prev) => {
          const updated = [...prev, { x: now, y: totalVolatiles }];
          const thirtyMinutesAgo = now - 30 * 60 * 1000;
          return updated.filter((item) => item.x >= thirtyMinutesAgo);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const chartSize = Math.min(width * 0.9, height * 0.4);
  const pieSize = Math.min(width * 0.55, height * 0.4);

  return (
    <ImageBackground
      source={require("../../../assets/TelaTipo2New.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            size={30}
            onPress={() => router.back()}
            iconColor="white"
            style={styles.backButton}
          />
          <Image
            source={require("../../../assets/LogoAzul.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Gases Voláteis</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Gráfico de Pizza */}
          <View style={styles.pieContainer}>
            <VictoryPie
              data={[
                { x: "Gases", y: gasPPM },
                { x: "Ar limpo", y: Math.max(0, 5000 - gasPPM) },
              ]}
              labels={({ datum }) => `${datum.x}\n${datum.y.toFixed(0)}ppm`}
              labelRadius={pieSize * 0.25}
              innerRadius={pieSize * 0.35}
              padAngle={2}
              cornerRadius={8}
              animate={{ duration: 1000 }}
              colorScale={[getGasColor(gasPPM), "rgba(255, 255, 255, 0.2)"]}
              style={{
                labels: {
                  fontSize: 12,
                  fill: "#fff",
                  fontWeight: "bold",
                },
              }}
              width={pieSize + 100}
              height={pieSize + 100}
            />
            <View style={styles.pieCenter}>
              <Text style={[styles.qualityText, { color: getGasColor(gasPPM) }]}>
                {AirQuality(gasPPM)}
              </Text>
              <Text style={styles.ppmText}>{gasPPM.toFixed(0)} ppm</Text>
            </View>
          </View>

          {/* Gráfico de Linha com Área */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Variação de Gases Voláteis (últimos 30 minutos)</Text>
            <VictoryChart
              width={width * 0.9}
              height={chartSize}
              padding={{ top: 40, bottom: 60, left: 60, right: 30 }}
              domainPadding={{ y: 10 }}
              domain={{ y: [0, 3000] }}
              theme={VictoryTheme.material}
            >
              <Defs>
                <LinearGradient
                  id="gasGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="#4CAF50" stopOpacity={0.8} />
                  <Stop offset="26.6%" stopColor="#FFC107" stopOpacity={0.7} />
                  <Stop offset="53.3%" stopColor="#FF9800" stopOpacity={0.6} />
                  <Stop offset="80%" stopColor="#F44336" stopOpacity={0.5} />
                  <Stop offset="100%" stopColor="#D32F2F" stopOpacity={0.4} />
                </LinearGradient>
              </Defs>
              
              <VictoryAxis
                tickFormat={formatTime}
                style={{
                  axis: { stroke: "#fff", strokeWidth: 2 },
                  tickLabels: {
                    fontSize: 10,
                    fill: "#fff",
                    angle: -45,
                  },
                  grid: { stroke: "rgba(255,255,255,0.1)" },
                }}
              />
              
              <VictoryAxis
                dependentAxis
                label="Concentração (ppm)"
                axisLabelComponent={
                  <VictoryLabel dy={-30} style={{ fill: "#fff" }} />
                }
                tickValues={[0, 800, 1200, 2000, 3000]}
                tickFormat={(y) => {
                  if (y === 800) return "800\n(ótimo)";
                  if (y === 1200) return "1200\n(aceitável)";
                  if (y === 2000) return "2000\n(limite)";
                  return `${y}`;
                }}
                style={{
                  axis: { stroke: "#fff", strokeWidth: 2 },
                  tickLabels: {
                    fontSize: 10,
                    fill: "#fff",
                    textAnchor: "middle",
                  },
                  grid: {
                    stroke: "rgba(255,255,255,0.1)",
                    strokeDasharray: "4,4",
                  },
                }}
              />
              
              <VictoryArea
                data={gasHistory}
                interpolation="natural"
                style={{
                  data: {
                    fill: "url(#gasGradient)",
                    stroke: "transparent",
                    fillOpacity: 0.7,
                  },
                }}
              />
              
              <VictoryLine
                data={gasHistory}
                interpolation="natural"
                style={{
                  data: {
                    stroke: "#fff",
                    strokeWidth: 3,
                    strokeLinecap: "round"
                  }
                }}
              />
              
              {/* Linhas de referência */}
              <VictoryLine
                data={[
                  { x: gasHistory[0]?.x || 0, y: 800 },
                  { x: gasHistory[gasHistory.length - 1]?.x || 0, y: 800 },
                ]}
                style={{
                  data: {
                    stroke: "#4CAF50",
                    strokeWidth: 1,
                    strokeDasharray: "2,2",
                    opacity: 0.6,
                  },
                }}
              />
              <VictoryLine
                data={[
                  { x: gasHistory[0]?.x || 0, y: 1200 },
                  { x: gasHistory[gasHistory.length - 1]?.x || 0, y: 1200 },
                ]}
                style={{
                  data: {
                    stroke: "#FFC107",
                    strokeWidth: 1,
                    strokeDasharray: "2,2",
                    opacity: 0.6,
                  },
                }}
              />
              <VictoryLine
                data={[
                  { x: gasHistory[0]?.x || 0, y: 2000 },
                  { x: gasHistory[gasHistory.length - 1]?.x || 0, y: 2000 },
                ]}
                style={{
                  data: {
                    stroke: "#F44336",
                    strokeWidth: 1.5,
                    strokeDasharray: "4,4",
                    opacity: 0.8,
                  },
                }}
              />
            </VictoryChart>
          </View>

          {/* Legenda */}
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Classificação da Qualidade do Ar</Text>
            <View style={styles.legendGrid}>
              {[
                { color: "#4CAF50", label: "Excelente", range: "0-800 ppm", description: "Nível seguro" },
                { color: "#FFC107", label: "Boa", range: "801-1200 ppm", description: "Atenção recomendada" },
                { color: "#FF9800", label: "Moderada", range: "1201-2000 ppm", description: "Ventilar o ambiente" },
                { color: "#F44336", label: "Ruim/Péssima", range: "2000+ ppm", description: "Risco à saúde" },
              ].map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: item.color }]}
                  />
                  <View style={styles.legendTextContainer}>
                    <Text style={styles.legendLabel}>{item.label} ({item.range})</Text>
                    <Text style={styles.legendDescription}>{item.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  header: {
    height: 180,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(66, 143, 119, 0.8)",
    borderRadius: 10,
  },
  logo: {
    width: 120,
    height: 80,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  scrollView: {
    flex: 1,
    width: "100%",
    marginTop: height * 0.1,
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 40,
  },
  pieContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 20,
    marginBottom: 30,
  },
  pieCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  qualityText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  ppmText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  chartContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    paddingVertical: 15,
  },
  chartTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  legendContainer: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  legendTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  legendGrid: {
    flexDirection: "column",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  legendDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
  },
  legendTextContainer: {
    flex: 1,
  },
  legendLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  legendDescription: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});