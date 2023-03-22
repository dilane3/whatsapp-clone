import { useSignal } from "@dilane3/gx";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  multiply,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ImageScreen() {
  // State
  const image = useSignal("image");
  const [zoomState, setZoomState] = useState(false);

  // Animation
  const baseScale = useSharedValue(1);
  const scale = useSharedValue(1);
  const translate = useSharedValue({ x: 0, y: 0 });
  const baseTranslate = useSharedValue({ x: 0, y: 0 });

  // Ref
  const imageRef = useRef<Animated.View>(null);

  // Effect
  useEffect(() => {
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
  }, [zoomState]);

  // Animated style
  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scale.value, [1, 2], [1, 3], "clamp"),
      },
      {
        translateX: translate.value.x,
      },
      {
        translateY: translate.value.y
      },
    ],
  }));

  // Handle Gesture
  const handleGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context = translate.value;
    },

    // onActive: (event, context) => {
    //   const numberOfPointers = event.numberOfPointers;

    //   if (numberOfPointers === 1) {
    //     if (scale.value === 1) {
    //       console.log("Ouiiii");
    //     }
    //   } else if (numberOfPointers === 2) {
    //     // console.log(event);
    //   }
    // },
  });

  // Handle double tap event
  const handleTapEvent = (
    event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (scale.value === 1) {
        scale.value = withTiming(2, { duration: 300 });
        baseScale.value = 2;
      } else {
        scale.value = withTiming(1, { duration: 300 });
        baseScale.value = 1;
        translate.value = { x: 0, y: 0 }
        baseTranslate.value = { x: 0, y: 0 }
      }

      runOnJS(setZoomState)(!zoomState);
    }
  };

  // Pinch detector gesture
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      const pinch = baseScale.value * e.scale;

      scale.value = interpolate(pinch, [1, 3], [1, 2], "clamp");
    })
    .onEnd(() => {
      baseScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      console.log(e);
    })
    .onUpdate((e) => {
      const value = {
        x: baseTranslate.value.x + e.translationX,
        y: baseTranslate.value.y + e.translationY,
      };

      translate.value = value;
    })
    .onEnd(() => {
      baseTranslate.value = translate.value
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <SafeAreaView style={styles.container}>
        <TapGestureHandler
          onHandlerStateChange={handleTapEvent}
          numberOfTaps={2}
        >
          <Animated.View style={styles.container}>
            <Animated.View
              ref={imageRef}
              style={[styles.imageContainer, imageStyle]}
            >
              <Image source={image} style={styles.image} resizeMode="contain" />
            </Animated.View>
          </Animated.View>
        </TapGestureHandler>
      </SafeAreaView>
    </GestureDetector>
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
