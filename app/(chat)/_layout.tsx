import { createStackNavigator } from "@react-navigation/stack";
import { KeyboardAvoidingView } from "react-native";
import { ChatScreen } from ".";

const Stack = createStackNavigator();

const ChatLayout = () => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Chat"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </KeyboardAvoidingView>
  );
};

export default ChatLayout;
