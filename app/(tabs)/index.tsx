import { View, Text, StyleSheet, ScrollView } from "react-native";
import Chat from "../../components/chats/Chat";

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})