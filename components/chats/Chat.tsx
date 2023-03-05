import { View, Text, Image, StyleSheet, Dimensions, TouchableNativeFeedback } from "react-native";

const image = require("../../assets/avatars/1.jpg");

export default function Chat() {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#ddd", false)}
      onPress={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.chatLeft}>
          <Image source={image} style={styles.image} />

          <View style={styles.chatInfos}>
            <Text style={styles.name}>Davila</Text>
            <Text style={styles.message}>Davila</Text>
          </View>
        </View>

        <View style={styles.chatRight}>
          <Text style={styles.date}>Yesterday</Text>
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
    paddingVertical: 20,
    height: 90
  },

  chatLeft: {
    width: Dimensions.get("screen").width - 120,
    flexDirection: "row",
    alignItems: "center"
  },

  chatInfos: {
    flexDirection: "column",
    marginLeft: 20,
    height: "100%",
    justifyContent: "space-around",
  },

  name: {
    fontSize: 16,
    fontFamily: "PoppinsMedium"
  },

  message: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: "#555"
  },

  chatRight: {
    width: 80,
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-end",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },

  date: {
    fontSize: 12,
    fontFamily: "PoppinsLight",
  },
});
