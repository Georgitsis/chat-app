// import the screens
import Login from "./components/Login";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import Firebase
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import firebaseConfig from "./config/firebaseConfig";

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Alert } from "react-native";
import { getStorage } from "firebase/storage";

// Create the navigator
const Stack = createNativeStackNavigator();

export default function App() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const storage = getStorage(app);

  //true if connected
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              storage={storage}
              isConnected={connectionStatus.isConnected}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
