import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

export default function CallUsScreen() {
  const fixedLocation = {
    latitude: -3.1341127922362193,
    longitude: -59.979204845909315,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView style={styles.container}>
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

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="email" size={RFValue(18)} color="#13D8B0" />
            <Text style={styles.infoText}>projeto.ecobreath@gmail.com</Text>
          </View>

          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="phone" size={RFValue(18)} color="#13D8B0" />
            <Text style={styles.infoText}>(92) 99508-6720</Text>
          </View>

          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="map-marker" size={RFValue(18)} color="#13D8B0" />
            <Text style={styles.infoText}>Av. Ministro Mário Andreazza, 916, Manaus - AM</Text>
          </View>
        </ScrollView>

        <View style={styles.mapContainer}>
          <MapView style={StyleSheet.absoluteFillObject} initialRegion={fixedLocation}>
            <Marker
              coordinate={fixedLocation}
              title="EcoBreath"
              description="Av. Ministro Mário Andreazza, 916, Manaus - AM"
            />
          </MapView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13D8B0',
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
    marginBottom: RFPercentage(3),
    textAlign: 'center',
  },
  scrollContent: {
    width: '100%',
    alignItems: 'flex-start',
    paddingBottom: RFPercentage(2),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFPercentage(1.8),
    width: '100%',
  },
  infoText: {
    flex: 1,
    color: '#0E9693',
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginLeft: RFValue(10),
  },
  mapContainer: {
    width: '100%',
    height: RFPercentage(25),
    borderRadius: RFValue(10),
    borderWidth: 2,
    borderColor: '#006765',
    marginTop: RFPercentage(2.5),
    marginBottom: RFPercentage(3),
    overflow: 'hidden',
  },
});
