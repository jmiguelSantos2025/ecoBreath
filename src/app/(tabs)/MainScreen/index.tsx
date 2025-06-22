import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, ImageBackground, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, database, firestore } from '../../../../firebaseConfig';
import { IconButton } from 'react-native-paper';
import { doc, getDoc } from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';
import CustomModal from '../../../Components/CustomModal';

const { width, height } = Dimensions.get("window");

export default function MainScreen() {
  const [userName, setUserName] = useState('Usuário');
  const [loadingName, setLoadingName] = useState(true);
  const [statusMachine, setStatusMachine] = useState(true);
  const [authMachine, setAuthMachine] = useState(false);
  const [danger, setDanger] = useState(false);
  const [dangerCo2, setDangerCo2] = useState(0);

  
  const [isNavigating, setIsNavigating] = useState(false);
  const handleNavigate = (action: () => void) => {
    if (isNavigating) return;
    setIsNavigating(true);
    action();
    setTimeout(() => setIsNavigating(false), 800); 
  };


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        (async () => {
          try {
            const userRef = doc(firestore, 'usuarios', user.uid);
            const snap = await getDoc(userRef);
            setUserName(snap.exists() && snap.data().username
              ? snap.data().username
              : 'Usuário'
            );
          } catch (err) {
            console.error('Erro ao buscar username:', err);
            setUserName('Usuário');
          } finally {
            setLoadingName(false);
          }
        })();
      } else {
        setUserName('Usuário');
        setLoadingName(false);
      }
    });

    const statusRef = ref(database, 'conexao/Ligado');
    const statusListener = onValue(statusRef, snapshot => {
      setStatusMachine(snapshot.val());
    });

    const co2Ref = ref(database, "SensoresPPM/CO2In");
    const co2Listener = onValue(co2Ref, snapshot => {
      const co2Value = snapshot.val();
      setDangerCo2(co2Value);
      if (statusMachine && co2Value >= 1000) {
        setDanger(true);
      } else {
        setDanger(false);
      }
    });

    return () => {
      unsubscribe();
      statusListener();
      co2Listener();
    };
  }, [statusMachine]);

  return (
    <ImageBackground
      source={require("../../../../assets/TelaFundoTipo1Novo.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <IconButton
          icon="arrow-left"
          size={30}
          onPress={() => handleNavigate(() => router.back())}
          iconColor="white"
          style={{ position: "absolute", top: 20, left: 20, zIndex: 10, backgroundColor: "#428F77" }}
        />

        <View style={styles.firstPierce}>
          <Image
            source={require("../../../../assets/LogoBranca.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.secondPierce}>
          <View style={styles.contentContainer}>
            {loadingName ? (
              <Text style={styles.text}>Carregando...</Text>
            ) : (
              <Text style={styles.text}>
                Bem-vindo: <Text>{userName}!</Text>
              </Text>
            )}

            <View style={styles.mainViewButton}>
              
              <View style={styles.viewButton}>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={() =>
                    handleNavigate(() => {
                      if (statusMachine) {
                        router.push('/MonitoringScreen');
                      } else {
                        setAuthMachine(!authMachine);
                      }
                    })
                  }
                >
                  <MaterialCommunityIcons
                    name="weather-windy"
                    size={width * 0.14}
                    color="#07C3C3"
                  />
                  <Text style={styles.buttonText}>Monitoramento</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={() => handleNavigate(() => router.push('PowerScreen'))}
                >
                  <MaterialCommunityIcons
                    name="power"
                    size={width * 0.14}
                    color="#07C3C3"
                  />
                  <Text style={styles.buttonText}>Ligar/Desligar</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.viewButton}>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={() => handleNavigate(() => router.push('CallUsScreen'))}
                >
                  <MaterialCommunityIcons
                    name="phone"
                    size={width * 0.16}
                    color="#07C3C3"
                  />
                  <Text style={styles.buttonText}>Contate-nos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={() => handleNavigate(() => router.push('ConfigScreen'))}
                >
                  <MaterialCommunityIcons
                    name="cog"
                    size={width * 0.14}
                    color="#07C3C3"
                  />
                  <Text style={styles.buttonText}>Configurações</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <CustomModal
          visible={authMachine}
          title="Ligue a Maquina antes de continuar"
          message="Não é possivel visualizar os dados quando a maquina estiver desligada!"
          onClose={() =>
            handleNavigate(() => {
              setAuthMachine(false);
              router.push('PowerScreen');
            })
          }
          icon="power"
          color="#006462"
        />

        <CustomModal
          visible={danger}
          title="Níveis perigosos para a saúde"
          message={`Os níveis de CO₂ estão em ${dangerCo2} ppm. Abra portas e janelas para ventilar o ambiente.`}
          onClose={() => handleNavigate(() => setDanger(false))}
          icon="alert-circle"
          color="#D9534F"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  firstPierce: {
    width: "100%",
    height: "23%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "5%",
  },
  secondPierce: {
    width: "100%",
    height: "77%",
  },
  logo: {
    width: width * 0.3,
    height: height * 0.2,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  text: {
    color: "#13C1CA",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: height * 0.02,
  },
  mainViewButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  viewButton: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: height * 0.02,
  },
  button: {
    width: "45%",
    aspectRatio: 1,
    borderRadius: 12,
    borderColor: "#07C3C3",
    borderWidth: 2,
    elevation: 5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    maxWidth: 180,
    maxHeight: 180,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#07C3C3",
    marginTop: height * 0.01,
    textAlign: "center",
    fontWeight: "bold",
  },
});
