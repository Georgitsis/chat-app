import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";

const Screen1 = ({ navigation }) => {
  const [name, setName] = useState("");
  const [backgroundColorOptions, setBackgroundColorOptions] = useState([
    "#090C08",
    "#474056",
    "#8A95A5",
    "#B9C6AE",
  ]);
  const [backgroundColorChoice, setBackgroundColorChoice] = useState("");

  return (
    <ImageBackground
      source={require("../assets/img/backgroundImage.png")} // Replace with your image source
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
            onPress={() =>
              navigation.navigate("Screen2", {
                name: name,
                backgroundColor: backgroundColorChoice,
              })
            }
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
    //position: "absolute",
    //top: "5%",
    width: "100%",
    padding: 15,
    borderWidth: 1,
    //marginTop: 15,
    //marginBottom: 15,
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
    //marginBottom: 20,
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
    //position: "absolute",
    //bottom: "5%",
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export default Screen1;
