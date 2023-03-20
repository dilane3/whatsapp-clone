import { useSignal } from "@dilane3/gx";
import { useEffect, useRef } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ImageScreen() {
  // State
  const image = useSignal("image");

  // Animation
  const scale = useSharedValue(0);

  // Ref
  const imageRef = useRef<Animated.View>(null);

  // Effect
  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.measureInWindow((x, y, width, height) => {
        console.log({
          x,
          y,
          width,
          height,
        });
      });
    }
  }, [scale]);

  // Animated style
  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scale.value, [0, 1], [1, 3], "clamp"),
      },
    ],
  }));

  return (
    <TapGestureHandler
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
          if (scale.value === 0) scale.value = withTiming(1, { duration: 300 });
          else scale.value = withTiming(0, { duration: 300 });

          if (imageRef.current) {
            imageRef.current.measure((x, y, width, height) => {
              console.log({
                x,
                y,
                width,
                height,
              });
            });
          }
        }
      }}
      numberOfTaps={2}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View
          ref={imageRef}
          style={[styles.imageContainer, imageStyle]}
        >
          <Image source={image} style={styles.image} resizeMode="contain" />
        </Animated.View>
      </SafeAreaView>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    width: "100%",
  },

  image: {
    width: "100%",
    resizeMode: "contain",
  },
});
