import { StackCardStyleInterpolator } from "@react-navigation/stack";
import { Animated } from "react-native";

export const forSlide: StackCardStyleInterpolator = ({
  current,
  next,
  inverted,
  layouts: { screen },
}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        // {
        //   translateY: Animated.multiply(
        //     progress.interpolate({
        //       inputRange: [0, 1, 2],
        //       outputRange: [
        //         screen.height * -0.2, // Focused, but offscreen in the beginning
        //         0, // Fully focused
        //         screen.height * 0.2, // Fully unfocused
        //       ],
        //       extrapolate: "clamp",
        //     }),
        //     inverted
        //   ),
        // },
        {
          scale: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [0.9, 1, 1.1],
              extrapolate: "clamp",
            }),
            inverted
          ),
        },
      ],
      opacity: Animated.multiply(
        progress.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, 1, 0],
          extrapolate: "extend",
        }),
        inverted
      ),
    },
  };
};
