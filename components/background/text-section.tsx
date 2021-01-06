import * as React from "react";
import { Animated, useWindowDimensions } from "react-native";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";

interface Props extends SvgProps {
  inverted: number;
  row: number;
}

const TextSection = ({ width, height, ...props }: Props) => {
  const cols = Math.ceil(useWindowDimensions().width / 120);
  const duration = 20000;

  const translateX = React.useRef(new Animated.Value(0)).current;
  const moveRight = () => {
    Animated.timing(translateX, {
      useNativeDriver: true,
      toValue: 100,
      duration,
    }).start(({ finished }) => finished && moveLeft());
  };
  const moveLeft = () => {
    Animated.timing(translateX, {
      useNativeDriver: true,
      toValue: -100,
      duration,
    }).start(({ finished }) => finished && moveRight());
  };

  React.useEffect(() => {
    props.inverted && moveRight();
    !props.inverted && moveLeft();
  }, []);

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          padding: 2,
          justifyContent: "center",
          flexDirection: props.inverted ? "row" : "row-reverse",
          opacity: 0.1,
          transform: [{ translateX }],
        },
      ]}
    >
      {[...Array(cols)].map((_, i) => (
        <Svg
          key={props.row + i}
          width={120 * (1 + 1 / 3)}
          height={60 * (1 + 1 / 3)}
          viewBox="0 0 120 60"
          fill="none"
        >
          <Path
            d="M57.0644 42.8908C60.9783 46.8048 60.9783 53.1506 57.0644 57.0645C53.1504 60.9785 46.8046 60.9785 42.8907 57.0645L2.93547 17.1093C-0.978494 13.1954 -0.978485 6.8496 2.93547 2.93564C6.84944 -0.978323 13.1952 -0.978324 17.1092 2.93564L57.0644 42.8908Z"
            fill="#FA5457"
          />
          <Path
            d="M43.013 2.93547C46.9269 -0.978494 53.2727 -0.978486 57.1867 2.93547C61.1006 6.84943 61.1006 13.1952 57.1867 17.1092L17.2315 57.0644C13.3175 60.9783 6.97174 60.9783 3.05778 57.0644C-0.856181 53.1504 -0.856183 46.8046 3.05778 42.8907L43.013 2.93547Z"
            fill="#FA5457"
          />
          <Circle cx="90" cy="30" r="20" stroke="#FA5457" strokeWidth="20" />
        </Svg>
      ))}
    </Animated.View>
  );
};

export default TextSection;
