import "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import store from "../gx/store";
import GXProvider from "@dilane3/gx";
import { Asset } from "expo-asset";

const images: string[] = [
  require("../assets/images/img3.jpg"),
  require("../assets/images/img4.jpg"),
  require("../assets/images/img5.jpg"),
  require("../assets/images/img6.jpg"),
  require("../assets/images/img7.jpg"),
];

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  // State
  const [imageLoaded, setImageLoaded] = useState(false);

  // Load fonts
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (!imageLoaded) preloadImages();
  }, []);

  const preloadImages = async () => {
    const now = Date.now();

    const imageAssets = images.map((image) => Asset.fromModule(image));
    const imagePromises = imageAssets.map((imageAsset) => {
      return imageAsset.downloadAsync();
    });

    await Promise.all(imagePromises);
    await new Promise(resolve => setTimeout(() => resolve(true), 2000))

    setImageLoaded(true);

    console.log(`Time left: ${Date.now() - now}ms`);
  };

  return (
    <GXProvider store={store}>
      <>
        {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
        {!loaded && <SplashScreen />}
        {loaded && imageLoaded && <RootLayoutNav />}

        {loaded && !imageLoaded && (
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.light.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontFamily: "PoppinsBold",
                marginBottom: 20,
              }}
            >
              WhatsApp
            </Text>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        <StatusBar style="light" backgroundColor={Colors.light.primary} />
      </>
    </GXProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(chat)" options={{ headerShown: false }} />
        <Stack.Screen name="(post)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
