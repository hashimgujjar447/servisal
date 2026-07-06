import { Colors } from "@/constants/colors";
import React, { useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

import splashLogo from "@/assets/images/welcomeScreenImage.png";
import SplashPersonLower from "@/assets/svg/splashPersonLower.svg";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={splashLogo} style={styles.logo} />
        </View>

        {/* Bottom Left Circles */}
        <View style={styles.largeCircle} />
        <View style={styles.smallCircle} />

        {/* Bottom Right SVG */}
        <View style={styles.bottomLogoContainer}>
          <View style={styles.bottomLogoHead} />
          <SplashPersonLower width={120} height={160} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    overflow: "hidden",
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -100 }],
  },

  logo: {
    width: 240,
    height: 240,
    resizeMode: "contain",
  },

  largeCircle: {
    position: "absolute",
    bottom: -80,
    left: -35,

    width: 250,
    height: 250,
    borderRadius: 125,

    backgroundColor: Colors.white,
    zIndex: 2,
  },

  smallCircle: {
    position: "absolute",
    bottom: 5,
    left: -70,

    width: 220,
    height: 220,
    borderRadius: 110,

    backgroundColor: Colors.white54,
    zIndex: 1,
  },

  bottomLogoContainer: {
    position: "absolute",
    bottom: 0,
    right: 105,
  },

  bottomLogoHead: {
    position: "absolute",
    top: -20,
    left: 40,

    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: Colors.white,
    zIndex: 10,
  },
});
