import { StackCardStyleInterpolator } from "@react-navigation/stack";
import { Animated, Platform } from "react-native";

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
      ...Platform.select({
        default: {
          transform: [{
            translateX: Animated.multiply(progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width,
                0,
                screen.width * -1
              ],
              extrapolate: "clamp"
            }), inverted)
          }]
        },
        android: {
          transform: [{
            scale: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0.9, 1, 1.1],
                extrapolate: "clamp",
              }),
              inverted
            ),
          }],
          opacity: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [0, 1, 0],
              extrapolate: "extend",
            }),
            inverted
          ),
        }
      })
    },
  };
};
