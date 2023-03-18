import { useSignal } from "@dilane3/gx";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { ChatSignalType } from "../../gx/signals/chats";

const bwa = require("../../assets/images/wa.jpg");

export const Navbar = () => {
  // State
  const { chats, currentChatId: chatId } = useSignal<ChatSignalType>("chat");

  const chat = useMemo(() => {
    return chats.find((c) => c.id === chatId);
  }, [chats]);

  return (
    <>
      {chat && (
        <View style={styles.navbar}>
          <View style={styles.navbarLeft}>
            <Ionicons name="arrow-back-sharp" color="#fff" size={25} />

            <View style={styles.navbarInfos}>
              <Image source={chat.avatar} style={styles.navbarImage} />

              <View style={styles.navbarPersonal}>
                <Text style={styles.navbarName}>{chat.name}</Text>
              </View>
            </View>
          </View>

          <View style={styles.navbarLeft}>
            <Ionicons
              name="videocam"
              color="#fff"
              size={20}
              style={{ marginRight: 20 }}
            />
            <Ionicons
              name="call-sharp"
              color="#fff"
              size={20}
              style={{ marginRight: 20 }}
            />
            <MaterialCommunityIcons
              name="dots-vertical"
              color="#fff"
              size={20}
            />
          </View>
        </View>
      )}
    </>
  );
};

export const MessageEditor = () => {
  return (
    <View style={styles.messageEditorContainer}>
      <View>
        <Entypo
          name="emoji-happy"
          size={25}
          color="#888"
          style={styles.messageEditorEmoji}
        />
        <TextInput
          placeholder="Message"
          style={styles.messageEditorInput}
          selectionColor={Colors.light.primary}
        />

        <View style={styles.messageEditorOtherIcons}>
          <Ionicons
            name="attach"
            size={25}
            color="#888"
            style={{
              marginRight: 15,
              transform: [
                {
                  rotateZ: "-45deg",
                },
              ],
            }}
          />
          <Ionicons name="camera" size={25} color="#888" />
        </View>
      </View>

      <View style={styles.messageEditorIcon}>
        <Ionicons name="mic" size={25} color="#fff" />
      </View>
    </View>
  );
};

export const ChatScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={bwa} style={{ flex: 1 }}>
        <Navbar />

        <View style={styles.main}>{/* <Text>Messages</Text> */}</View>

        <MessageEditor />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    height: 60,
    backgroundColor: Colors.light.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  navbarLeft: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  navbarInfos: {
    flexDirection: "row",
  },

  navbarImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginLeft: 5,
  },

  navbarPersonal: {
    marginLeft: 10,
    justifyContent: "center",
  },

  navbarName: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    color: "#fff",
  },

  // Main
  main: {
    width: "100%",
    flex: 1,
    // height: Dimensions.get("screen").height - 210,
  },

  // Message editor
  messageEditorContainer: {
    position: "absolute",
    bottom: 1,
    width: "100%",
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  messageEditorInput: {
    width: Dimensions.get("screen").width - 80,
    height: 50,
    borderRadius: 40,
    backgroundColor: "#fff",
    paddingRight: 20,
    paddingLeft: 50,
    color: "#888",
    fontSize: 16,
    elevation: 1,
  },

  messageEditorIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  messageEditorEmoji: {
    position: "absolute",
    zIndex: 2,
    bottom: 12,
    left: 15,
  },

  messageEditorOtherIcons: {
    position: "absolute",
    zIndex: 2,
    bottom: 12,
    right: 15,
    flexDirection: "row",
  },
});
