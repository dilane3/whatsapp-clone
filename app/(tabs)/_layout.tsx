// import { Slot } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import HomeScreen from ".";
import Colors from "../../constants/Colors";
import CommunityScreen from "./community";
import StatusScreen from "./status";
import CallScreen from "./call";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

export default function TabsLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <TabNavigator />

      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#ddd", false)}
      >
        <View style={styles.chatIcon}>
          <Ionicons 
            name="chatbubble-ellipses"
            size={30}
            color="#fff"
          />
        </View>
      </TouchableNativeFeedback>
    </SafeAreaView>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.light.primary,
        },
        tabBarLabelStyle: {
          fontFamily: "PoppinsRegular",
          fontWeight: "700",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#fff",
          height: 3,
        },
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Com."
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="people" size={25} color={color} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen name="Chats" component={HomeScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Call" component={CallScreen} />
    </Tab.Navigator>
  );
};

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>WhatsApp</Text>

      <View style={styles.navbarIcons}>
        <Ionicons
          style={styles.icon}
          name="camera-outline"
          size={22}
          color="#f1f1f1"
        />

        <Ionicons style={styles.icon} name="search" size={22} color="#f1f1f1" />

        <MaterialCommunityIcons
          style={styles.icon}
          name="dots-vertical"
          size={22}
          color="#f1f1f1"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  navbar: {
    height: 50,
    backgroundColor: Colors.light.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  logo: {
    fontSize: 20,
    fontFamily: "PoppinsMedium",
    color: "#f1f1f1",
  },

  navbarIcons: {
    flexDirection: "row",
  },

  icon: {
    marginLeft: 20,
  },

  chatIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  }
});
