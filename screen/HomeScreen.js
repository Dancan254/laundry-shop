import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [items, setItems] = useState([]);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  console.log(cart);
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
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
    } else {
      setlocationServicesEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
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

    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords)
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // console.log(response)

      for (let item of response) {
        let address = `${item.city} ${item.country}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db, "types");
      const docsSnap = await getDocs(colRef);
      setItems((prevItems) => [
        ...prevItems,
        ...docsSnap.docs.map((doc) => doc.data()),
      ]);
      services.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);
  console.log(product);
  const services = [
    {
      id: "0",
      image:
        "https://images.pexels.com/photos/4495705/pexels-photo-4495705.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Clothes",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image:
        "https://images.pexels.com/photos/8774638/pexels-photo-8774638.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Sheets",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image:
        "https://images.pexels.com/photos/5504775/pexels-photo-5504775.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Blankets",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image:
        "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Carpets",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image:
        "https://images.pexels.com/photos/6044815/pexels-photo-6044815.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Curtains",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image:
        "https://images.pexels.com/photos/634538/pexels-photo-634538.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Bags",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image:
        "https://media.istockphoto.com/id/71925568/photo/bedroom.jpg?b=1&s=612x612&w=0&k=20&c=UL9XrQf-KkMUk4moskDrQCLjbiPgn6ff8Af41LCT7WI=",
      name: "Duvets",
      quantity: 0,
      price: 10,
    },
  ];

  // Define a color variable for consistent styling
  const primaryColor = "#fd5c63";
  const backgroundColor = "#F0F0F0";
  const buttonColor = "#088F8F";

  return (
    <>
      <ScrollView style={{ backgroundColor, flex: 1, marginTop: 50 }}>
        {/* Location and Profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={30} color={primaryColor} />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: "auto", marginRight: 7 }}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://media.istockphoto.com/id/1165135044/photo/row-of-industrial-laundry-machines-in-laundromat-in-a-public-laundromat-with-laundry-in-a.jpg?b=1&s=612x612&w=0&k=20&c=yp9vsj3Zw5dRMO3Sr58JylBS3NAKlEPbIHvMhr5hOJY=",
              }}
            />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
          <TextInput
            placeholder="Search for items or More"
            style={{ flex: 1, padding: 5 }} // Adjusted styling for better visibility
          />
          <Feather name="search" size={24} color={primaryColor} />
        </View>

        {/* Image Carousel */}
        <Carousel />

        {/* Services Component */}
        <Services />

        {/* Render all the Products */}
        {services.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>

      {/* Cart and Pickup Section */}
      {total > 0 && (
        <Pressable
          style={{
            backgroundColor: buttonColor,
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.cartInfoContainer}>
  <Text style={styles.cartInfoText}>
    {cart.length} {cart.length === 1 ? "item" : "items"} | $ {total}
  </Text>
  <Text style={styles.extraChargesText}>Extra charges might apply</Text>
</View>

<Pressable style={styles.proceedButton} onPress={() => navigation.navigate("PickUp")}>
  <Text style={styles.proceedButtonText}>Proceed to Pickup</Text>
</Pressable>

        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
    flex: 1,
    marginTop: 50,
  },
  locationProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  searchBarContainer: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.8,
    borderColor: "#C0C0C0",
    borderRadius: 7,
  },
  profileImageContainer: {
    marginLeft: "auto",
    marginRight: 7,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cartInfoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  cartInfoText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
    marginBottom: 6,
  },
  extraChargesText: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
  },
  proceedButton: {
    backgroundColor: "#088F8F",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  proceedButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  }
});
