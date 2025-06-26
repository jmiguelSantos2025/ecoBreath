import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Linking,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

export default function CallUsScreen() {
  const fixedLocation = {
    latitude: -3.1341127922362193,
    longitude: -59.979204845909315,
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:projeto.ecobreath@gmail.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+5592995086720');
  };

  const handleAddressPress = async () => {
    const { latitude, longitude } = fixedLocation;
    const label = encodeURIComponent('EcoBreath');
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${label}`;
    
    const urls = {
      ios: `comgooglemaps://?q=${latitude},${longitude}(${label})`,
      android: `google.navigation:q=${latitude},${longitude}`
    };

    try {
      const supported = await Linking.canOpenURL(urls[Platform.OS]);
      if (supported) {
        await Linking.openURL(urls[Platform.OS]);
      } else {
        await Linking.openURL(googleMapsUrl);
      }
    } catch (error) {
      Linking.openURL(googleMapsUrl);
    }
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://site-eco-seven.vercel.app');
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permissão de localização negada');
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <IconButton
          icon="arrow-left"
          size={RFValue(26)}
          onPress={() => router.back()}
          iconColor="white"
          style={styles.backButton}
        />

        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/LogoBranca.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="phone" color="white" size={RFValue(40)} />
          </View>

          <Text style={styles.title}>Fale Conosco</Text>
          <Text style={styles.subtitle}>Estamos sempre prontos para ajudar!</Text>

          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.contactCard} onPress={handleEmailPress}>
              <View style={styles.contactIcon}>
                <MaterialCommunityIcons name="email" size={RFValue(24)} color="#13D8B0" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>projeto.ecobreath@gmail.com</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} onPress={handlePhonePress}>
              <View style={styles.contactIcon}>
                <MaterialCommunityIcons name="phone" size={RFValue(24)} color="#13D8B0" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Telefone</Text>
                <Text style={styles.contactValue}>(92) 99508-6720</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} onPress={handleAddressPress}>
              <View style={styles.contactIcon}>
                <MaterialCommunityIcons name="map-marker" size={RFValue(24)} color="#13D8B0" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Endereço</Text>
                <Text style={styles.contactValue}>Av. Ministro Mário Andreazza, 916, Manaus - AM</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} onPress={handleWebsitePress}>
              <View style={styles.contactIcon}>
                <MaterialCommunityIcons name="web" size={RFValue(24)} color="#13D8B0" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Website</Text>
                <Text style={styles.contactValue}>www.ecobreath.com.br</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.footerCard}>
              <MaterialCommunityIcons name="clock" size={RFValue(20)} color="#006765" />
              <Text style={styles.footerText}>Horário de atendimento: Seg-Sex, 8h-18h</Text>
            </View>
            
            <View style={styles.inspirationCard}>
              <MaterialCommunityIcons name="leaf" size={RFValue(28)} color="#13D8B0" />
              <Text style={styles.inspirationText}>
                Juntos por um ar mais limpo e uma Manaus mais sustentável
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13D8B0',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: RFPercentage(3),
    left: RFPercentage(2),
    zIndex: 10,
    backgroundColor: '#428F77',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: RFPercentage(5),
    backgroundColor: '#13D8B0',
  },
  logo: {
    width: '60%',
    height: undefined,
    aspectRatio: 2.5,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    paddingHorizontal: RFPercentage(3),
    paddingTop: RFPercentage(3),
    alignItems: 'center',
    minHeight: RFPercentage(70), // Garante altura mínima
  },
  contentContainer: {
    width: '100%',
    paddingBottom: RFPercentage(5),
  },
  iconWrapper: {
    backgroundColor: '#13D8B0',
    borderRadius: RFValue(100),
    padding: RFValue(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFPercentage(2.5),
  },
  title: {
    fontSize: RFValue(20),
    color: '#13C1CA',
    fontWeight: 'bold',
    marginBottom: RFPercentage(1),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: RFValue(14),
    color: '#7A7A7A',
    marginBottom: RFPercentage(3),
    textAlign: 'center',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: RFValue(15),
    padding: RFValue(15),
    marginBottom: RFPercentage(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIcon: {
    backgroundColor: '#E6F8F5',
    borderRadius: RFValue(50),
    width: RFValue(50),
    height: RFValue(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFValue(15),
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    color: '#006765',
    fontSize: RFValue(12),
    fontWeight: '600',
    marginBottom: RFValue(3),
  },
  contactValue: {
    color: '#0E9693',
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F8F5',
    borderRadius: RFValue(10),
    padding: RFValue(12),
    marginTop: RFPercentage(1),
    marginBottom: RFPercentage(3),
  },
  footerText: {
    color: '#006765',
    fontSize: RFValue(12),
    marginLeft: RFValue(10),
    flex: 1,
  },
  inspirationCard: {
    backgroundColor: '#F0FDFA',
    borderRadius: RFValue(15),
    padding: RFValue(20),
    marginTop: RFPercentage(1),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#13D8B0',
  },
  inspirationText: {
    color: '#006765',
    fontSize: RFValue(14),
    fontWeight: '600',
    textAlign: 'center',
    marginTop: RFValue(10),
    lineHeight: RFValue(20),
  },
});