import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { auth } from '../firebase';
import { signOut } from 'firebase/auth'; // Correct import statement

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (!user) {
    // User not authenticated yet, or authentication state is loading
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Pressable style={styles.userInfoContainer}>
          <Text>Welcome {user.email}</Text>
        </Pressable>

        <Pressable onPress={signOutUser} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
  },
  userInfoContainer: {
    marginVertical: 10,
  },
  signOutButton: {
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
