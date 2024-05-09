import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  Animated,
} from "react-native";
import { MaterialCommunityIcons,Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // New state
  const [loginAttempted, setLoginAttempted] = useState(false); // Track login attempts
  const errorMessageOpacity = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // if (authUser) {
      //   setLoading(false);
      // }
      if (authUser) {
        navigation.replace("Home");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleLoginError = async (error) => {
    console.error("Login error:", error);

    let errorMessage = "Invalid email or password. Please try again.";

    // Customize the error message based on the error code or type if needed
    if (error.code === "auth/invalid-email") {
      errorMessage =
        "Invalid email format. Please enter a valid email address.";
    } else if (error.code === "auth/user-not-found") {
      errorMessage = "User not found. Please check your email and try again.";
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Incorrect password. Please try again.";
    }

    setErrorMessage(errorMessage);
    setLoginAttempted(true);

    Animated.timing(errorMessageOpacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const login = () => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user credential", userCredential);
        const user = userCredential.user;
        console.log("user details", user);
        setErrorMessage(null);
        navigation.replace("Home");
      })
      .catch(handleLoginError)
      .finally(() => {
        setLoginAttempted(true); // Moved inside the finally block
        setLoading(false);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      {loading ? (
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text>Loading</Text>
          <ActivityIndicator size="large" color={"red"} />
        </View>
      ) : (
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50, // Adjusted the marginTop for better spacing
            }}
          >
            <Text
              style={{
                fontSize: 24, // Increased font size for a more prominent title
                color: "#318CE7", // Change to a blue color for consistency
                fontWeight: "bold",
                marginBottom: 8, // Added margin at the bottom for spacing
              }}
            >
              Sign In
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginTop: 8,
                fontWeight: "600",
                color: "#555",
              }}
            >
              Welcome back! Please sign in to your account.
            </Text>
          </View>

          {loginAttempted && errorMessage && (
  <Animated.View
    style={{
      ...styles.errorMessageContainer,
      opacity: errorMessageOpacity,
      marginTop: 20, // Added marginTop for better spacing
    }}
  >
    <Text style={styles.errorMessageText}>
      {errorMessage}
    </Text>
  </Animated.View>
)}


          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="#318CE7" // Change to a blue color for consistency
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="#555" // Dark gray placeholder text color
                style={{
                  fontSize: email ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "#9E9E9E", // Light gray border
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 10,
                  color: "#333", // Dark text color
                }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="key-outline"
                size={24}
                color="#318CE7" // Change to a blue color for consistency
              />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#555" // Dark gray placeholder text color
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "#9E9E9E", // Light gray border
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 20,
                  color: "#333", // Dark text color
                }}
              />
            </View>

            <Pressable
              onPress={login}
              style={{
                width: 200,
                backgroundColor: "#318CE7",
                padding: 15,
                borderRadius: 7,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}
              >
                Login
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={{
                marginTop: 20,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: "#F0F0F0",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "#555",
                  fontWeight: "500",
                }}
              >
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  errorMessageContainer: {
    marginTop: 20, // Adjusted marginTop for better spacing
    padding: 15, // Adjusted padding for better content spacing
    backgroundColor: "#FF6F61",
    borderRadius: 10,
    width: "80%", // Adjust the width as needed
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    elevation: 3, // for Android shadow
    shadowColor: "black", // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  errorMessageText: {
    color: "white",
    fontSize: 16,
  },
});

