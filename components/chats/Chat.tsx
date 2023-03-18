import { useAction } from "@dilane3/gx";
import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import { Chat as ChatType } from "../../gx/signals/chats";

type Props = {
  chat: ChatType;
};

export default function Chat({ chat }: Props) {
  // Navigation
  const navigation = useNavigation();

  // Actions from signal
  const select = useAction("chat", "select")

  // Some handlers
  const navigateToChat = () => {
    select(chat.id);
    navigation.dispatch(CommonActions.navigate("(chat)"));
  };

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#ddd", false)}
      onPress={navigateToChat}
    >
      <View style={styles.container}>
        <View style={styles.chatLeft}>
          <Image source={chat.avatar} style={styles.image} />

          <View style={styles.chatInfos}>
            <Text style={styles.name}>{chat.name}</Text>
            <Text style={styles.message} numberOfLines={1}>
              {chat.message}
            </Text>
          </View>
        </View>

        <View style={styles.chatRight}>
          <Text style={styles.date}>{chat.date}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 80,
  },

  chatLeft: {
    width: Dimensions.get("screen").width - 120,
    flexDirection: "row",
    alignItems: "center",
  },

  chatInfos: {
    flexDirection: "column",
    marginLeft: 20,
    height: "100%",
    justifyContent: "space-around",
  },

  name: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },

  message: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: "#555",
  },

  chatRight: {
    width: 80,
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-end",
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },

  date: {
    fontSize: 12,
    fontFamily: "PoppinsLight",
  },
});
