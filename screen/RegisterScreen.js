import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();
  const register = () => {
    if (email === "" || password === "" || phone === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill in all the required fields.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log("user credential", userCredential);
        const user = userCredential._tokenResponse.email;
        const myUserUid = auth.currentUser.uid;

        setDoc(doc(db, "users", `${myUserUid}`), {
          email: user,
          phone: phone,
        });
      }
    );
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
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: "#318CE7",
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Sign Up
          </Text>
        </View>

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
                fontSize: 18,
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
            <Feather
              name="phone"
              size={24}
              color="#318CE7" // Change to a blue color for consistency
            />
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Phone No"
              placeholderTextColor="#555" // Dark gray placeholder text color
              style={{
                fontSize: password ? 18 : 18,
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
            onPress={register}
            style={{
              width: 200,
              backgroundColor: "#318CE7",
              padding: 15,
              borderRadius: 10,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              elevation: 3,
              shadowColor: "#333", // Dark shadow color
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              marginTop: 20,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: "#F0F0F0", // Light background for the link
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
              Already have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
