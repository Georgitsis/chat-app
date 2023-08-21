import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";
import Chat from "./Chat";

const Screen2 = ({ route, navigation, db }) => {
  const { name } = route.params;
  const { backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Chat db={db} userId={route.params.userId} name={name} />
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
