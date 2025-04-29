import { View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import { IconButton } from "react-native-paper";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryPie,
  VictoryTheme,
} from "victory-native";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { router } from "expo-router";

export default function GraphicsScreen() {
  const [co2, setCo2] = useState<number>(0);
  const [co2History, setCo2History] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const dbRef = ref(database, "Sensores");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const co2Value = data.MQ135OUT || 0;
        setCo2(co2Value);

        const now = Date.now(); // Pega o horário exato da eu acho

        setCo2History((prev) => {
          const updated = [...prev, { x: now, y: calcPercentage(co2Value) }];
          const thirtyMinutesAgo = now - 30 * 60 * 1000;
          return updated.filter((item) => item.x >= thirtyMinutesAgo);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const calcPercentage = (value: number) => (value / 4096) * 100;

  const AirQuality = (valor: number) => {
    switch (true) {
      case valor > 5000:
        return "Péssima";
      case valor >= 2000:
        return "Ruim";
      case valor >= 1000:
        return "Moderada";
      case valor >= 400:
        return "Boa";
      case valor < 400:
        return "Excelente";
      default:
        return "Desconhecido";
    }
  };

  const formatMinutesAgo = (timestamp: number) => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return diffMinutes <= 0 ? "Agora" : `${diffMinutes} min`;
  };

  return (
    <ImageBackground
      source={require("../../../assets/TelaTipo2New.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <IconButton
          icon="arrow-left"
          size={30}
          onPress={() => router.back()}
          iconColor="white"
          style={styles.backButton}
        />

        <View style={styles.firstPierce}>
          <Image
            source={require("../../../assets/LogoAzul.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.secondPierce}>
          <View style={styles.contentContainer}>
            <View style={styles.bigGraphContainer}>
              <VictoryPie
                theme={VictoryTheme.clean}
                data={[
                  { x: "CO2", y: calcPercentage(co2) },
                  { x: "Outros", y: 100 - calcPercentage(co2) },
                ]}
                labels={() => null}
                cornerRadius={8}
                startAngle={-6}
                innerRadius={120}
                style={{
                  parent: { backgroundColor: "transparent" },
                  data: {
                    fill: ({ datum }) => {
                      const colors: Record<string, string> = {
                        CO2: "#006462",
                        Outros: "#D9D9D9",
                      };
                      return colors[datum.x] || "#ccc";
                    },
                  },
                }}
                width={300}
                height={300}
              />
              <View style={styles.centeredTextBig}>
                <Text style={styles.airQualityTextBig}>{AirQuality(co2)}</Text>
              </View>
            </View>

            <View>
              <VictoryChart theme={VictoryTheme.clean}>
                <VictoryAxis
                  tickFormat={(t) => formatMinutesAgo(t)}
                  style={{
                    tickLabels: { fontSize: 10, angle: 45, textAnchor: "start" },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  label="CO2 (%)"
                  domain={[0, 100]}
                  style={{
                    axisLabel: { padding: 30 },
                  }}
                />
                <VictoryArea
                  data={co2History}
                  interpolation="natural"
                  style={{
                    data: {
                      fill: "rgba(0, 100, 98, 0.5)",
                      stroke: "#006462",
                      strokeWidth: 2,
                    },
                  }}
                />
              </VictoryChart>
            </View>

          </View>
        </View>
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "#428F77",
  },
  firstPierce: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "30%",
    height: "70%",
  },
  secondPierce: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bigGraphContainer: {
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop:100,
  },
  centeredTextBig: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  airQualityTextBig: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006462",
    textAlign: "center",
  },
});
