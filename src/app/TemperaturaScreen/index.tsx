import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import { IconButton } from "react-native-paper";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
  VictoryPie
} from "victory-native";
import { onValue, ref } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { router } from "expo-router";
import { Defs, LinearGradient, Stop } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export default function TemperaturaScreen() {
  const [temp, setTemp] = useState<number>(0);
  const [tempHistory, setTempHistory] = useState<{ x: number; y: number }[]>([]);

  const getTempColor = (temp: number) => {
    if (temp < 20) return "#00BFFF";
    else if (temp < 23) return "#1E90FF";
    else if (temp < 26) return "#32CD32";
    else if (temp < 28) return "#FFD700";
    else if (temp < 30) return "#FF6347";
    else return "#FF4500";
  };

  const AirQuality = (temp: number) => {
    if (temp < 20) return "FRIO";
    else if (temp < 23) return "FRESCO";
    else if (temp < 26) return "AMENO";
    else if (temp < 28) return "MORNO";
    else if (temp < 30) return "QUENTE";
    else return "MUITO QUENTE";
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const dbRef = ref(database, "TempeUmid");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const sensorValue = data.Temperatura || 0;
        setTemp(sensorValue);
        const now = Date.now();
        setTempHistory((prev) => {
          const updated = [...prev, { x: now, y: sensorValue }]
          const thirtyMinutesAgo = now - 30 * 60 * 1000;
          return updated.filter((item) => item.x >= thirtyMinutesAgo);
        });; 
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
          <Text style={styles.title}>Temperatura Ambiente</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pieContainer}>
            <VictoryPie
              data={[
                { x: "", y: temp },
                { x: "", y: Math.max(0, 100 - temp) },
              ]}
              labels={({ datum }) => datum.x}
              labelRadius={pieSize * 0.25 + 70}
              innerRadius={pieSize * 0.35}
              padAngle={2}
              cornerRadius={8}
              animate={{ duration: 1000 }}
              colorScale={[getTempColor(temp), "rgba(6, 126, 60, 0.2)"]}
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
              <Text style={[styles.qualityText, { color: getTempColor(temp) }]}>
                {AirQuality(temp)}
              </Text>
              <Text style={styles.ppmText}>
                {temp.toFixed(1)} °C
              </Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Variação Temperatura x Tempo</Text>
            <VictoryChart
              width={width * 0.9}
              height={chartSize}
              padding={{ top: 40, bottom: 60, left: 60, right: 30 }}
              domainPadding={{ y: 5 }}
              domain={{ y: [0, 100] }} 
              theme={VictoryTheme.material}
            >
              <Defs>
                <LinearGradient
                  id="tempGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="#00BFFF" stopOpacity={0.8} />
                  <Stop offset="20%" stopColor="#1E90FF" stopOpacity={0.7} />
                  <Stop offset="40%" stopColor="#32CD32" stopOpacity={0.6} />
                  <Stop offset="60%" stopColor="#FFD700" stopOpacity={0.5} />
                  <Stop offset="80%" stopColor="#FF6347" stopOpacity={0.4} />
                  <Stop offset="100%" stopColor="#FF4500" stopOpacity={0.3} />
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
                label="Temperatura (°C)"
                axisLabelComponent={
                  <VictoryLabel dy={-30} style={{ fill: "#fff" }} />
                }
                tickValues={[0, 20, 40, 60, 80, 100]}
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
                data={tempHistory}
                interpolation="natural"
                style={{
                  data: {
                    fill: "url(#tempGradient)",
                    stroke: "transparent",
                    fillOpacity: 0.7,
                  },
                }}
              />
              
              <VictoryLine
                data={tempHistory}
                interpolation="natural"
                style={{
                  data: {
                    stroke: "#fff",
                    strokeWidth: 3,
                    strokeLinecap: "round"
                  }
                }}
              />
            </VictoryChart>
          </View>

          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Faixas de Temperatura</Text>
            <View style={styles.legendGrid}>
              {[
                { color: "#00BFFF", label: "Frio", range: "< 20 °C" },
                { color: "#1E90FF", label: "Fresco", range: "20 - 22.9 °C" },
                { color: "#32CD32", label: "Ameno", range: "23 - 25.9 °C" },
                { color: "#FFD700", label: "Morno", range: "26 - 27.9 °C" },
                { color: "#FF6347", label: "Quente", range: "28 - 29.9 °C" },
                { color: "#FF4500", label: "Muito Quente", range: "≥ 30 °C" },
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