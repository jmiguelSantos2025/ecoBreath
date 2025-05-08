import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  useWindowDimensions,
  ScrollView,
  Dimensions
} from "react-native";
import { IconButton } from "react-native-paper";
import {
  VictoryPie,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryLabel,
  VictoryTheme
} from "victory-native";
import { onValue, ref } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function AirQualityScreen() {
  const [co2PPM, setCo2PPM] = useState<number>(400);
  const [volatilePPM, setVolatilePPM] = useState<number>(200);
  const [history, setHistory] = useState<{
    co2: { x: number; y: number }[];
    volatiles: { x: number; y: number }[];
    cleanAir: { x: number; y: number }[];
  }>({ co2: [], volatiles: [], cleanAir: [] });

  const { width, height } = useWindowDimensions();

  const getAirColor = (totalPPM: number) => {
    if (totalPPM < 800) return "#4CAF50";
    if (totalPPM < 1200) return "#FFC107";
    if (totalPPM < 2000) return "#FF9800";
    return "#F44336";
  };

  const AirQuality = (totalPPM: number) => {
    if (totalPPM < 800) return "EXCELENTE";
    if (totalPPM < 1200) return "BOA";
    if (totalPPM < 2000) return "MODERADA";
    if (totalPPM < 5000) return "RUIM";
    return "PÉSSIMA";
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const dbRef = ref(database, "SensoresPPM");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const co2 = data.CO2In || 0;
        const volatiles = ((data.C2H50H || 0) + (data.CH4 || 0) + (data.CO || 0) + (data.H2 || 0) + (data.HN3 || 0) + (data.NO2 || 0)) / 6;

        const totalGases = co2 + volatiles;
        const now = Date.now();
        const cleanAir = Math.max(0, 5000 - totalGases);

        setCo2PPM(co2);
        setVolatilePPM(volatiles);

        setHistory((prev) => {
          const co2H = [...prev.co2, { x: now, y: co2 }];
          const volH = [...prev.volatiles, { x: now, y: volatiles }];
          const cleanH = [...prev.cleanAir, { x: now, y: cleanAir }];
          const cutoff = now - 30 * 60 * 1000;

          return {
            co2: co2H.filter((item) => item.x >= cutoff),
            volatiles: volH.filter((item) => item.x >= cutoff),
            cleanAir: cleanH.filter((item) => item.x >= cutoff),
          };
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const totalPPM = (co2PPM + volatilePPM);
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
          <Text style={styles.title}>Qualidade do Ar</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pieContainer}>
            <VictoryPie
              data={[
                { x: "CO₂", y: co2PPM },
                { x: "Gases", y: volatilePPM },
                { x: "Ar puro", y: Math.max(0, 5000 - totalPPM) },
              ]}
              labels={({ datum }) => datum.x}
              labelRadius={pieSize * 0.25 + 70}
              innerRadius={pieSize * 0.35}
              padAngle={2}
              cornerRadius={8}
              animate={{ duration: 1000 }}
              colorScale={["#03A9F4", "#FF9800", "rgba(6, 126, 60, 0.2)"]}
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
              <Text style={[styles.qualityText, { color: getAirColor(totalPPM) }]}>
                {AirQuality(totalPPM)}
              </Text>
              <Text style={styles.ppmText}>{totalPPM.toFixed(0)} ppm</Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Histórico de CO₂ e Gases Voláteis</Text>
            <VictoryChart
              width={width * 0.9}
              height={chartSize}
              padding={{ top: 40, bottom: 60, left: 60, right: 30 }}
              domainPadding={{ y: 10 }}
              theme={VictoryTheme.material}
            >
              <VictoryAxis
                tickFormat={formatTime}
                style={{
                  axis: { stroke: "#fff", strokeWidth: 2 },
                  tickLabels: { fontSize: 10, fill: "#fff", angle: -45 },
                  grid: { stroke: "rgba(255,255,255,0.1)" },
                }}
              />
              <VictoryAxis
                dependentAxis
                label="Concentração (co2+gases voláteis em ppm)"
                axisLabelComponent={<VictoryLabel dy={-30} style={{ fill: "#fff" }} />}
                tickFormat={(y) => y}
                style={{
                  axis: { stroke: "#fff", strokeWidth: 2 },
                  tickLabels: { fontSize: 10, fill: "#fff" },
                  grid: {
                    stroke: "rgba(255,255,255,0.1)",
                    strokeDasharray: "4,4",
                  },
                }}
              />
              <VictoryLine
                data={history.co2}
                interpolation="natural"
                style={{ data: { stroke: "#03A9F4", strokeWidth: 2 } }}
              />
              <VictoryLine
                data={history.volatiles}
                interpolation="natural"
                style={{ data: { stroke: "#FF9800", strokeWidth: 2 } }}
              />
              <VictoryLine
                data={history.cleanAir}
                interpolation="natural"
                style={{ data: { stroke: "#4CAF50", strokeWidth: 2 } }}
              />
            </VictoryChart>
          </View>

          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Legenda de Qualidade do Ar (CO₂ + Gases Voláteis)</Text>
            <View style={styles.legendGrid}>
              {[
                { color: "#4CAF50", label: "Excelente", range: "0 - 800 ppm" },
                { color: "#FFC107", label: "Boa", range: "801 - 1200 ppm" },
                { color: "#FF9800", label: "Moderada", range: "1201 - 2000 ppm" },
                { color: "#F44336", label: "Ruim / Péssima", range: "2001+ ppm" },
              ].map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                  <View style={styles.legendTextContainer}>
                    <Text style={styles.legendLabel}>{item.label}</Text>
                    <Text style={styles.legendRange}>{item.range}</Text>
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
  imageBackground: { flex: 1, width: "100%", height: "100%" },
  container: { flex: 1 },
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
  logo: { width: 120, height: 80, marginBottom: 10 },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  scrollView: { flex: 1, width: "100%", marginTop: height * 0.1 },
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  ppmText: {
    color: "#fff",
    fontSize: 16,
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 12,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  legendTextContainer: { flex: 1 },
  legendLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  legendRange: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
