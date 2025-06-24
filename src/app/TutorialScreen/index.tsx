import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


const responsiveHeight = (percentage:number) => screenHeight * (percentage / 100);
const responsiveWidth = (percentage: number) => screenWidth * (percentage / 100);

export default function TutorialScreen() {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={screenWidth}
        snapToAlignment="center"
      >
       
        <View style={[styles.screen, { width: screenWidth }]}>
          <LinearGradient
            colors={['#E6F7FF', '#FFFFFF']}
            style={styles.background}
          />
          
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/LogoTutorial.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            
            <Text style={styles.title}>Bem-vindo ao EcoBreath</Text>
            
            <Text style={styles.subtitle}>
              Seu aliado para respirar melhor
            </Text>
            
            <Text style={styles.description}>
              O EcoBreath monitora e melhora a qualidade do ar em ambientes fechados, 
              ajudando pessoas com condições respiratórias.
            </Text>
          </View>
          
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>
        </View>
        
   
        <View style={[styles.screen, { width: screenWidth }]}>
          <LinearGradient
            colors={['#E6F7FF', '#FFFFFF']}
            style={styles.background}
          />
          
          <View style={[styles.contentContainer, { justifyContent: 'space-between' }]}>
            <ScrollView 
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.secondScreenHeader}>
                <Image
                  source={require('../../../assets/LogoAzul.png')}
                  style={styles.secondScreenLogo}
                  resizeMode="contain"
                />
                <Text style={styles.secondScreenTitle}>Como usar</Text>
              </View>
              
              <View style={styles.instructionsContainer}>
                {[
                  "Ligue o dispositivo na tomada",
                  "Conecte-se ao Wi-Fi do dispositivo",
                  "Abra o aplicativo EcoBreath",
                  "Siga as instruções de calibração",
                  "Monitore a qualidade do ar"
                ].map((step, index) => (
                  <View key={index} style={styles.instructionCard}>
                    <View style={styles.stepIndicator}>
                      <Text style={styles.stepNumber}>{index + 1}</Text>
                    </View>
                    <Text style={styles.instructionText}>{step}</Text>
                  </View>
                ))}
              </View>
            
              <View style={styles.bottomContainer}>
                <TouchableOpacity 
                  style={styles.startButton}
                >
                  <Text style={styles.startButtonText}>Começar</Text>
                </TouchableOpacity>
                
                <View style={styles.footerNoteContainer}>
                  <Text style={styles.footerNote}>
                    Para melhores resultados, mantenha o dispositivo em local ventilado
                  </Text>
                </View>
                
                <View style={styles.dotsContainer}>
                  <View style={styles.dot} />
                  <View style={[styles.dot, styles.activeDot]} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: responsiveHeight(2), 
    paddingTop: responsiveHeight(2),
  },
  contentContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: responsiveHeight(2),
  },
  imageContainer: {
    width: '100%',
    height: responsiveHeight(25), 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  image: {
    width: responsiveWidth(70), 
    height: responsiveHeight(20), 
    maxHeight: 200,
  },
  title: {
    fontSize: responsiveHeight(3.5),
    fontWeight: '700',
    color: '#00A3C4',
    textAlign: 'center',
    marginBottom: responsiveHeight(1),
    fontFamily: 'Roboto_700Bold',
    maxWidth: '90%',
  },
  subtitle: {
    fontSize: responsiveHeight(2.2),
    color: '#00A3C4',
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
    fontWeight: '500',
    maxWidth: '90%',
  },
  description: {
    fontSize: responsiveHeight(2),
    color: '#5A5A5A',
    textAlign: 'center',
    lineHeight: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(8),
    marginBottom: responsiveHeight(2),
  },
  secondScreenHeader: {
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(1),
  },
  secondScreenLogo: {
    width: responsiveWidth(25),
    height: responsiveWidth(25),
    marginBottom: responsiveHeight(1.5),
    maxWidth: 120, 
    maxHeight: 120, 
  },
  secondScreenTitle: {
    fontSize: responsiveHeight(3),
    fontWeight: '700',
    color: '#00A3C4',
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
    maxWidth: '90%',
  },
  instructionsContainer: {
    width: '100%',
    marginBottom: responsiveHeight(2),
  },
  instructionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 163, 196, 0.1)',
    borderRadius: 12,
    padding: responsiveHeight(1.8),
    marginBottom: responsiveHeight(1.2),
    width: '100%',
  },
  stepIndicator: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    backgroundColor: '#00A3C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(3),
  },
  stepNumber: {
    color: 'white',
    fontSize: responsiveHeight(1.8),
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: responsiveHeight(1.9),
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#00A3C4',
    paddingVertical: responsiveHeight(1.8),
    paddingHorizontal: responsiveWidth(12),
    borderRadius: 30,
    marginBottom: responsiveHeight(1.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    minWidth: responsiveWidth(50),
  },
  startButtonText: {
    color: 'white',
    fontSize: responsiveHeight(2),
    fontWeight: '600',
    textAlign: 'center',
  },
  footerNoteContainer: {
    justifyContent: "center", 
    alignItems: "center",
    marginBottom: responsiveHeight(2),
    width: '100%',
  },
  footerNote: {
    fontSize: responsiveHeight(1.6),
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: responsiveWidth(8),
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1),
  },
  dot: {
    width: responsiveWidth(2.5),
    height: responsiveWidth(2.5),
    borderRadius: responsiveWidth(1.25),
    backgroundColor: '#D3D3D3',
    marginHorizontal: responsiveWidth(1.5),
  },
  activeDot: {
    backgroundColor: '#00A3C4',
    width: responsiveWidth(5),
    borderRadius: responsiveWidth(2.5),
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
});