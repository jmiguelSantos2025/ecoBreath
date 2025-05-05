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

export default function Co2Screen() {
  const { width, height } = useWindowDimensions();
  const [co2PPM, setCo2PPM] = useState<number>(400);
  const [co2History, setCo2History] = useState<{ x: number; y: number }[]>([]);

  const getCO2Color = (ppm: number) => {
    if (ppm < 800) return "#4CAF50";
    if (ppm < 1200) return "#FFC107";
    if (ppm < 2000) return "#FF9800";
    return "#F44336";
  };

  const AirQuality = (ppm: number) => {
    if (ppm < 800) return "EXCELENTE";
    if (ppm < 1200) return "BOA";
    if (ppm < 2000) return "MODERADA";
    if (ppm < 5000) return "RUIM";
    return "PÉSSIMA";
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const dbRef = ref(database, "SensoresPPM/CO2In");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const ppm = snapshot.val() || 0;
        setCo2PPM(ppm);

        const now = Date.now();
        setCo2History((prev) => {
          const updated = [...prev, { x: now, y: ppm }];
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
          <Text style={styles.title}>Niveis de CO2</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pieContainer}>
            <VictoryPie
              data={[
                { x: "CO₂(ppm)", y: co2PPM },
                { x: "Ar limpo", y: Math.max(0, 5000 - co2PPM) },
              ]}
              labels={({ datum }) => datum.x}
              labelRadius={pieSize * 0.25 + 70}
              innerRadius={pieSize * 0.35}
              padAngle={2}
              cornerRadius={8}
              animate={{ duration: 1000 }}
              colorScale={[getCO2Color(co2PPM), "rgba(6, 126, 60, 0.2)"]}
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
              <Text style={[styles.qualityText, { color: getCO2Color(co2PPM) }]}>
                {AirQuality(co2PPM)}
              </Text>
              <Text style={styles.ppmText}>{co2PPM.toFixed(0)} ppm</Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Variação Temporal</Text>
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
                label="CO₂ (ppm)"
                axisLabelComponent={
                  <VictoryLabel dy={-30} style={{ fill: "#fff" }} />
                }
                tickValues={[500, 1000, 1500, 2000, 2500, 3000]}
                tickFormat={(y) =>
                  y === 2000 ? "2000\n(perigo)" : `${y}`
                }
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
                data={co2History}
                interpolation="natural"
                style={{
                  data: {
                    fill: "url(#areaGradient)",
                    stroke: "#fff",
                    strokeWidth: 3,
                    fillOpacity: 0.7,
                  },
                }}
                animate={{ duration: 1000 }}
              />
              <VictoryLine
                data={[
                  { x: co2History[0]?.x || 0, y: 2000 },
                  { x: co2History[co2History.length - 1]?.x || 0, y: 2000 },
                ]}
                style={{
                  data: {
                    stroke: "#FF5722",
                    strokeWidth: 2,
                    strokeDasharray: "5,5",
                    opacity: 0.8,
                  },
                }}
              />
              <Defs>
                <LinearGradient
                  id="areaGradient"
                  x1="0%"
                  y1="40%"
                  x2="0%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="rgba(0,150,136,0.8)" />
                  <Stop offset="100%" stopColor="rgba(77,182,172,0.2)" />
                </LinearGradient>
              </Defs>
            </VictoryChart>
          </View>

          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Legenda de Qualidade do Ar</Text>
            <View style={styles.legendGrid}>
              {[
                { color: "#4CAF50", label: "Excelente", range: "0-800 ppm" },
                { color: "#FFC107", label: "Boa", range: "801-1200 ppm" },
                { color: "#FF9800", label: "Moderada", range: "1201-2000 ppm" },
                { color: "#F44336", label: "Ruim/Péssima", range: "2000+ ppm" },
              ].map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: item.color }]}
                  />
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
    marginTop: height*0.1,
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
  legendTextContainer: {
    flex: 1,
  },
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
