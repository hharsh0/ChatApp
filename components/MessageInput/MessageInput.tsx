import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import {
  SimpleLineIcons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log("sending message");
    setMessage("");
  };

  const onPlusClick = () => {
    console.log("on plus click");
  };

  const onPressHandler = () => {
    if (message) {
      sendMessage();
    } else {
      onPlusClick();
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}
    >
      <View style={styles.inputContainer}>
        <SimpleLineIcons
          style={styles.icon}
          name="emotsmile"
          size={24}
          color="#595959"
        />
        <TextInput
          placeholder="Message..."
          style={styles.input}
          value={message}
          onChange={(newMessage) => setMessage(newMessage)}
        />
        <Feather style={styles.icon} name="camera" size={24} color="#595959" />
        <MaterialCommunityIcons
          style={styles.icon}
          name="microphone-outline"
          size={24}
          color="#595959"
        />
      </View>
      <Pressable onPress={onPressHandler} style={styles.buttonContainer}>
        {message ? (
          <Ionicons name="send" size={18} color="white" />
        ) : (
          <AntDesign name="plus" size={24} color="white" />
        )}
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#dedede",
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
    padding: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#3777f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 35,
  },
});
