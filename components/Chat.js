import { useState, useEffect } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = ({ route, navigation, db, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor, userId } = route.params;
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#89CFF0",
          },
          left: {
            backgroundColor: "#A9D39E",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  const cacheMessages = async (messages) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedLists = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setLists(JSON.parse(cachedLists));
  };

  let unSubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      if (unSubMessages) unSubMessages();
      unSubMessages = null;
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unSubMessages = onSnapshot(q, (documentsSnapshot) => {
        let fetchedMessages = [];
        documentsSnapshot.forEach((message) => {
          const createdAtTimestamp = message.data().createdAt; // Assuming createdAt is the Timestamp field
          const createdAtDate = createdAtTimestamp.toDate(); // Convert Timestamp to Date
          fetchedMessages.push({
            _id: message.id,
            ...message.data(),
            createdAt: createdAtDate,
          });
        });
        cacheMessages(fetchedMessages);
        setMessages(fetchedMessages);
      });
    } else loadCachedLists();
    return () => {
      if (unSubMessages) unSubMessages();
    };
  }, [isConnected]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%", // Set the width to 100%
  },
});

export default Chat;
