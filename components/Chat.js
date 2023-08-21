import { useState, useEffect } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = ({ db, userId, name }) => {
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unSubMessages = onSnapshot(q, (documentsSnapshot) => {
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
      setMessages(fetchedMessages);
    });
    return () => {
      if (unSubMessages) unSubMessages();
    };
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
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
