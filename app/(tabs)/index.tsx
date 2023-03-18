import { useSignal } from "@dilane3/gx";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ChatComponent from "../../components/chats/Chat";
import { Chat, ChatSignalType } from "../../gx/signals/chats";

export default function Home() {
  // State
  const { chats } = useSignal<ChatSignalType>("chat");

  return (
    <ScrollView style={styles.container}>
      {
        chats.map((chat: Chat) => (
          <ChatComponent key={chat.id} chat={chat} />
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})