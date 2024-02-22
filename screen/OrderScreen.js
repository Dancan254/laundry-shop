import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";

const OrderScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../assets/thumbs.json")}
          style={styles.animation}
          autoPlay
          loop={false}
          speed={0.7}
        />
      </View>

      <Text style={styles.orderText}>Your order has been Placed</Text>

      <View style={styles.animationContainer}>
        <LottieView
          source={require("../assets/sparkle.json")}
          style={styles.animation}
          autoPlay
          loop={false}
          speed={0.7}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animationContainer: {
    height: 360,
    width: 300,
    alignSelf: "center",
    marginTop: 40,
    justifyContent: "center",
  },
  animation: {
    height: 300,
    width: 300,
    alignSelf: "center",
  },
  orderText: {
    marginTop: 40,
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default OrderScreen;
