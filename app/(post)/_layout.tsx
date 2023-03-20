import "react-native-gesture-handler"
import { createStackNavigator } from "@react-navigation/stack";
import { KeyboardAvoidingView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ImageScreen from "./image";

const Stack = createStackNavigator();

const PostLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Image"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Image" component={ImageScreen} />
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default PostLayout;
