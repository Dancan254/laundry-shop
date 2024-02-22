import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
    const deliveryTime = [
      { id: "0", name: "2-3 Days" },
      { id: "1", name: "3-4 Days" },
      { id: "2", name: "4-5 Days" },
      { id: "3", name: "5-6 Days" },
      { id: "4", name: "Tomorrow" },
    ];
    
    

    const times = [
      { id: "0", time: "9:00 AM" },
      { id: "1", time: "10:00 AM" },
      { id: "2", time: "11:00 AM" },
      { id: "3", time: "12:00 PM" }, // Added 12:00 PM (noon)
      { id: "4", time: "1:00 PM" },
      { id: "5", time: "2:00 PM" },
      { id: "6", time: "3:00 PM" },
      { id: "7", time: "5:00 PM" },
      { id: "8", time: "6:00 PM" },
      { id: "9", time: "7:00 PM" },
      { id: "10", time: "8:00 PM" },
    ];
    

  const navigation = useNavigation();

  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert(
        "Empty or Invalid",
        "Please select all the fields",
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
    if (selectedDate && selectedTime && delivery) {
      navigation.replace("Cart", {
        pickUpDate: selectedDate,
        selectedTime: selectedTime,
        no_Of_days: delivery,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Enter Address</Text>
      <TextInput
        style={styles.addressInput}
        multiline
        numberOfLines={4}
        placeholder="Type your address here"
      />

      <Text style={styles.label}>Pick Up Date</Text>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date()}
        endDate={new Date(new Date().setDate(new Date().getDate() + 7))}
        initialSelectedDate={new Date()}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#4285F4"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />

      <Text style={styles.label}>Select Time</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {times.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedTime(item.time)}
            style={
              selectedTime.includes(item.time)
                ? { ...styles.timeButton, backgroundColor: "#4285F4" }
                : styles.timeButton
            }
          >
            <Text>{item.time}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.label}>Delivery Date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {deliveryTime.map((item, i) => (
          <Pressable
            key={i}
            style={
              delivery.includes(item.name)
                ? { ...styles.deliveryButton, backgroundColor: "#4285F4" }
                : styles.deliveryButton
            }
            onPress={() => setDelivery(item.name)}
          >
            <Text>{item.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {total !== 0 && (
        <Pressable style={styles.checkoutButton} onPress={proceedToCart}>
          <Text style={styles.checkoutButtonText}>Proceed to Cart</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Updated to white
    padding: 15,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "500",
    marginVertical: 10,
  },
  addressInput: {
    padding: 15,
    borderColor: "gray",
    borderWidth: 0.7,
    borderRadius: 9,
    marginVertical: 10,
  },
  timeButton: {
    margin: 15,
    borderRadius: 7,
    padding: 15,
    borderColor: "gray",
    borderWidth: 0.7,
  },
  deliveryButton: {
    margin: 15,
    borderRadius: 7,
    padding: 15,
    borderColor: "gray",
    borderWidth: 0.7,
  },
  checkoutButton: {
    backgroundColor: "#4285F4",
    marginTop: "auto",
    padding: 10,
    marginBottom: 40,
    marginHorizontal: 15,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFF",
    borderRadius: 7,
    borderWidth: 0.8,
    padding: 5,
  },
  selectedItemTextStyle: {
    color: "#FFF",
  },
  flatListContainerStyle: {
    marginVertical: 10,
  },
  
});

export default PickUpScreen;
