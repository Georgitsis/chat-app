import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";

const Screen2 = ({ route, navigation }) => {
  const { name } = route.params;
  const { backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text>Chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Screen2;
