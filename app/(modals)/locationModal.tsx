import Input from "@/components/Input";
import ModalHeader from "@/components/ModalHeader";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/context/RegisterContext";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

const LocationModal = () => {
  const { registerData, setRegisterData } = useAuth();
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLoadingLocation(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Permission to access location was denied.");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentLocation.coords;

      const newRegion: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(newRegion);

      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (address.length > 0) {
        const place = address[0];

        const formattedAddress = [
          place.street,
          place.city,
          place.region,
          place.country,
        ]
          .filter(Boolean)
          .join(", ");

        setLocation(formattedAddress);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingLocation(false);
    }
  };

  const setCurrentLocation = () => {
    setRegisterData((prev) => ({
      ...prev,
      location,
    }));

    // router.back(); // or navigate to next screen
    router.push("/(modals)/policyModal");
  };

  return (
    <View style={{ flex: 1 }}>
      <ModalHeader text="Location" />

      <View style={styles.container}>
        <Text style={styles.headingText}>Set Your Location</Text>

        <View style={styles.mapContainer}>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Search Location"
              value={location}
              onChangeText={setLocation}
              leftIcon={<EvilIcons name="search" size={24} color="black" />}
              style={{ borderColor: Colors.placeholder }}
            />

            {region && (
              <MapView
                style={styles.map}
                initialRegion={region}
                showsUserLocation
                showsMyLocationButton
              >
                <Marker coordinate={region} />
              </MapView>
            )}
          </View>

          <Pressable style={styles.button} onPress={setCurrentLocation}>
            {loadingLocation ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Use Current Location</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  inputContainer: {
    paddingVertical: 20,
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    marginTop: 100,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  mapContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
});
