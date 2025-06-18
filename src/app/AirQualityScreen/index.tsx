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
import { Defs, LinearGradient, Stop } from "react-native-svg";

import {
  VictoryPie,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryLabel,
  VictoryTheme,
  VictoryArea,
} from "victory-native";
import { off, onValue, ref } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function AirQualityScreen() {
  const [volatilePPM, setVolatilePPM] = useState<number>(200);
  const [history, setHistory] = useState<{
    volatiles: { x: number; y: number }[];
    cleanAir: { x: number; y: number }[];
  }>({ volatiles: [], cleanAir: [] });
  const { width, height } = useWindowDimensions();

  const getAirColor = (total: number) => {
    if (total <= 800) return "#4CAF50";
    if (total <= 1200) return "#FFC107";
    if (total <= 2000) return "#FF9800";
    if (total <= 5000) return "#FF5722";
    return "#B71C1C";
  };

  const AirQuality = (total: number) => {
    if (total <= 800) return "Excelente";
    if (total <= 1200) return "Boa";
    if (total <= 2000) return "Moderada";
    if (total <= 5000) return "Ruim";
    return "Péssima";
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };
  interface HistoricoSensores {
  timestamp: number;
  CCOV: number;
  [key: string]: any; // permite que existam outros campos
}


  useEffect(() => {
  const historicoRef = ref(database, "/HistoricoSensores");
  const outrosParametrosRef = ref(database, "/OutrosParametros");

  // Callback para o histórico
  const onHistoricoChange = (snapshot: any) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      const now = Date.now();
      const cutoff = now - 30 * 60 * 1000; // últimos 30 minutos

      const agrupadoPorMinuto: Record<
        string,
        { sum: number; count: number; timestamp: number }
      > = {};

      Object.values(data).forEach((item: any) => {
        if (item.timestamp >= cutoff) {
          const minuto = Math.floor(item.timestamp / 60000) * 60000;
          if (!agrupadoPorMinuto[minuto]) {
            agrupadoPorMinuto[minuto] = {
              sum: 0,
              count: 0,
              timestamp: minuto,
            };
          }
          agrupadoPorMinuto[minuto].sum += item.CCOV || 0;
          agrupadoPorMinuto[minuto].count += 1;
        }
      });

      const historico = Object.values(agrupadoPorMinuto)
        .map((item) => ({
          timestamp: item.timestamp,
          CCOV: item.sum / item.count,
        }))
        .sort((a, b) => a.timestamp - b.timestamp);

      const volatilesHistory = historico.map((item) => ({
        x: item.timestamp,
        y: item.CCOV,
      }));

      const cleanAirHistory = historico.map((item) => ({
        x: item.timestamp,
        y: Math.max(0, 6000 - item.CCOV),
      }));

      setHistory({
        volatiles: volatilesHistory,
        cleanAir: cleanAirHistory,
      });
    }
  };

  // Callback para leitura em tempo real de OutrosParametros
  const onOutrosParametrosChange = (snapshot: any) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const ccovValor = data.CCOV || 0;
      setVolatilePPM(ccovValor); // atualiza o gráfico de cima em tempo real
    }
  };

  // Ativa os listeners
  onValue(historicoRef, onHistoricoChange);
  onValue(outrosParametrosRef, onOutrosParametrosChange);

  // Cleanup dos listeners
  return () => {
    off(historicoRef, "value", onHistoricoChange);
    off(outrosParametrosRef, "value", onOutrosParametrosChange);
  };
}, []);




  const totalPPM = volatilePPM;
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
            key={volatilePPM}
              data={[
                { x: "Gases", y: volatilePPM },
                { x: "Ar puro", y: Math.max(0, 6000 - totalPPM) },
              ]}
              labels={({ datum }) => datum.x}
              labelRadius={pieSize * 0.25 + 70}
              innerRadius={pieSize * 0.35}
              padAngle={2}
              cornerRadius={8}
              animate={{ duration: 1000 }}
              colorScale={["#03A9F4", "rgba(13, 162, 182, 0.5)"]}
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
              <Text
                style={[styles.qualityText, { color: getAirColor(totalPPM) }]}
              >
                {AirQuality(totalPPM)}
              </Text>
              <Text style={styles.ppmText}>{totalPPM.toFixed(0)} ppb</Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Histórico de Gases Voláteis</Text>

            <VictoryChart
              width={width * 0.9}
              height={chartSize}
              padding={{ top: 40, bottom: 60, left: 60, right: 30 }}
              domainPadding={{ y: 5 }}
              domain={{ y: [0, 6000] }}
              theme={VictoryTheme.material}
            >
              <Defs>
                <LinearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <Stop offset="0%" stopColor="#03A9F4" />
                  <Stop offset="100%" stopColor="#4CAF50" />
                </LinearGradient>
              </Defs>

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
                label="Concentração (gases voláteis em ppb)"
                axisLabelComponent={
                  <VictoryLabel dy={-30} style={{ fill: "#fff" }} />
                }
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

              <VictoryArea
                data={history.volatiles}
                interpolation="natural"
                style={{
                  data: {
                    fill: "url(#lineGradient)",
                    opacity: 0.3,
                    stroke: "transparent",
                  },
                }}
              />

              <VictoryLine
                data={history.volatiles}
                interpolation="natural"
                style={{
                  data: {
                    stroke: "url(#lineGradient)",
                    strokeWidth: 3,
                    strokeLinecap: "round",
                  },
                }}
              />
            </VictoryChart>
          </View>

          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>
              Legenda de Qualidade do Ar (Gases Voláteis)
            </Text>
            <View style={styles.legendGrid}>
              {[
                { color: "#4CAF50", label: "Excelente", range: "0 - 800 ppb" },
                { color: "#FFC107", label: "Boa", range: "801 - 1200 ppb" },
                { color: "#FF9800", label: "Moderada", range: "1201 - 2000 ppb" },
                { color: "#FF5722", label: "Ruim", range: "2001 - 5000 ppb" },
                { color: "#B71C1C", label: "Péssima", range: "5001+ ppb" },
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
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "rgba(0, 40, 60, 0.5)",
    borderRadius: 40,
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
    textShadowColor: "rgba(144, 138, 138, 0.8)",
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
    width: "85%",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor: "rgba(0, 40, 60, 0.5)",
    borderRadius: 40,
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
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(0, 40, 60, 0.5)",
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
