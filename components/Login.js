import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

const Login = ({ navigation }) => {
  const [name, setName] = useState("");
  const [backgroundColorOptions, setBackgroundColorOptions] = useState([
    "#090C08",
    "#474056",
    "#8A95A5",
    "#B9C6AE",
  ]);
  const [backgroundColorChoice, setBackgroundColorChoice] = useState("");

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userId: result.user.uid,
          name: name,
          backgroundColor: backgroundColorChoice,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <ImageBackground
      source={require("../assets/img/backgroundImage.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.appTitle}>Chat-App</Text>
        <View style={styles.loginGroup}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />
          <View style={styles.colorButtonGroupWithText}>
            <Text>Choose Background Color:</Text>
            <View style={styles.colorButtonGroup}>
              {backgroundColorOptions.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.colorButton, { backgroundColor: color }]}
                  onPress={() => setBackgroundColorChoice(color)}
                >
                  <Text></Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={styles.button} // Add a style for the TouchableOpacity
            onPress={() => signInUser()}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
          {Platform.OS === "ios" ? (
            <KeyboardAvoidingView behavior="padding" />
          ) : null}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginGroup: {
    justifyContent: "space-between",
    position: "absolute",
    bottom: "3%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: "44%",
    minHeight: 300,
    width: "88%",
    borderColor: "#000",
    padding: "6%",
  },
  textInput: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' or 'contain'
  },
  appTitle: {
    position: "absolute",
    top: "12%",
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  colorButtonGroupWithText: {
    alignItems: "left",
    width: "100%",
  },
  colorButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between", // You can adjust this based on your needs
    alignItems: "center", // Align items vertically within the container
    marginTop: 10,
    width: "100%",
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    height: 70,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export default Login;
