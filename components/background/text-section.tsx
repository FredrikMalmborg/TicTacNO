import * as React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, Animated, useWindowDimensions } from "react-native";
import Svg, { SvgProps, G, Path, Circle } from "react-native-svg";

// import Circle from '../../assets/images/circle.svg'
// import Cross from '../../assets/images/cross.svg'

interface Props extends SvgProps {
  inverted: number
}

const TextSection = ({ width, height, ...props }: Props) => {
  const cols = Math.ceil((useWindowDimensions().width * 2) / 160)

  const translateX = React.useRef(new Animated.Value(0)).current;
  const moveRight = () => {
    Animated.timing(translateX, {
      useNativeDriver: true,
      toValue: 100,
      duration: 10000
    }).start(
      ({ finished }) => finished && moveLeft()
    );
  };
  const moveLeft = () => {
    Animated.timing(translateX, {
      useNativeDriver: true,
      toValue: -100,
      duration: 10000,
    }).start(
      ({ finished }) => finished && moveRight()
    );
  };

  React.useEffect(() => {
    props.inverted && moveRight();
    !props.inverted && moveLeft();
  }, []);

  return (
    <Animated.View style={[
      {
        flex: 1,
        justifyContent: 'center',
        flexDirection: props.inverted ? 'row' : 'row-reverse',
        opacity: .1,
        transform: [
          { translateX }
        ]

      }]}>

      {[...Array(cols)].map((_, i) => (
        <>
          <Svg width="80" height="80" viewBox="0 0 60 60" fill="none"  >
            <Circle
              cx="30"
              cy="30"
              r="20"
              stroke="#FA5457"
              strokeWidth="20"
            />
          </Svg>
          <Svg width="80" height="80" viewBox="0 0 60 60" fill="none">
            <Path
              d="M57.0644 42.8908C60.9783 46.8048 60.9783 53.1506 57.0644 57.0645C53.1504 60.9785 46.8046 60.9785 42.8907 57.0645L2.93547 17.1093C-0.978494 13.1954 -0.978485 6.8496 2.93547 2.93564C6.84944 -0.978323 13.1952 -0.978324 17.1092 2.93564L57.0644 42.8908Z"
              fill="#FA5457" />
            <Path
              d="M43.013 2.93547C46.9269 -0.978494 53.2727 -0.978486 57.1867 2.93547C61.1006 6.84943 61.1006 13.1952 57.1867 17.1092L17.2315 57.0644C13.3175 60.9783 6.97174 60.9783 3.05778 57.0644C-0.856181 53.1504 -0.856183 46.8046 3.05778 42.8907L43.013 2.93547Z"
              fill="#FA5457" />
          </Svg>

        </>
      ))}
    </Animated.View>
  );
  // return (
  //   <View style={[
  //     {
  //       flex: 1
  //     }]}>
  //     <Animated.View style={{
  //       width: '100%',
  //       transform: [
  //         { translateX: 0 }
  //       ]
  //     }}>
  //       <Svg viewBox={`0 0 700 85`} width="100%" height="100%" {...props}>
  //         <G id="prefix__Lager_5" data-name="Lager 5">
  //           <Path
  //             fill="#ea565a"
  //             opacity="0.1"
  //             d="M653.48 0a43 43 0 1043 43 43 43 0 00-43-43zm0 57.87A14.92 14.92 0 11668.4 43a14.92 14.92 0 01-14.92 14.87z"
  //           />
  //           <Path
  //             fill="#ea565a"
  //             opacity="0.1"
  //             d="M586.32 43.26L606.62 23a6.37 6.37 0 000-9l-11.9-11.9a6.37 6.37 0 00-9 0l-20.3 20.3-20.3-20.3a6.37 6.37 0 00-9 0L524.2 14a6.37 6.37 0 000 9l20.3 20.3-20.3 20.3a6.37 6.37 0 000 9l11.9 11.9a6.37 6.37 0 009 0l20.3-20.3 20.3 20.3a6.37 6.37 0 009 0l11.9-11.9a6.37 6.37 0 000-9z"
  //           />
  //           <Path
  //             fill="#ea565a"
  //             opacity="0.1"
  //             d="M479.37.09a43 43 0 1043 43 43 43 0 00-43-43zm0 57.87a14.92 14.92 0 1114.92-14.91A14.91 14.91 0 01479.37 58z"
  //           />
  //           <Path
  //             fill="#ea565a"
  //             opacity="0.1"
  //             d="M412.21 43.35l20.3-20.3a6.37 6.37 0 000-9l-11.9-11.9a6.37 6.37 0 00-9 0l-20.3 20.3L371 2.14a6.37 6.37 0 00-9 0L350.09 14a6.37 6.37 0 000 9l20.3 20.3-20.3 20.3a6.37 6.37 0 000 9L362 84.57a6.39 6.39 0 009 0l20.3-20.31 20.3 20.31a6.39 6.39 0 009 0l11.9-11.91a6.37 6.37 0 000-9z"
  //           />
  //           <Path
  //             fill="#ea565a"
  //             opacity="0.1"
  //             d="M305.26.14a43 43 0 1043 43 43 43 0 00-43-43zm0 57.87a14.92 14.92 0 1114.92-14.92A14.92 14.92 0 01305.26 58z"
  //           />
  //           <Path
  //             fill="#ea565a"
  //             opacity="0.1"
  //             d="M238.1 43.4l20.3-20.3a6.37 6.37 0 000-9L246.5 2.19a6.37 6.37 0 00-9 0l-20.3 20.3-20.3-20.3a6.37 6.37 0 00-9 0L176 14.09a6.37 6.37 0 000 9l20.3 20.3L176 63.7a6.37 6.37 0 000 9l11.9 11.9a6.37 6.37 0 009 0l20.3-20.3 20.3 20.3a6.37 6.37 0 009 0l11.9-11.9a6.37 6.37 0 000-9z"
  //           />
  //           <Path
  //             fill="#ea565a"
  //             opacity="0.1"
  //             d="M131.15.23a43 43 0 1043 43 43 43 0 00-43-43zm0 57.87a14.92 14.92 0 1114.92-14.91 14.92 14.92 0 01-14.92 14.91z"
  //           />
  //           <Path
  //             fill="#ea565a"
  //             opacity="0.5"
  //             d="M64 43.49l20.3-20.3a6.37 6.37 0 000-9L72.39 2.28a6.37 6.37 0 00-9 0l-20.3 20.3-20.31-20.3a6.37 6.37 0 00-9 0L1.87 14.18a6.37 6.37 0 000 9l20.3 20.3-20.3 20.31a6.37 6.37 0 000 9l11.9 11.9a6.37 6.37 0 009 0l20.3-20.3 20.3 20.3a6.37 6.37 0 009 0l11.9-11.9a6.37 6.37 0 000-9z"
  //           />
  //         </G>
  //       </Svg>
  //     </Animated.View>
  //   </View>
  // );
};

const styles = StyleSheet.create(
  (
    width: string | number | undefined,
    height: string | number | undefined
  ): StyleProp<ViewStyle> => ({
    width: `${width ? width : "100%"}`,
    height: `${height ? height : "100%"}`,
    marginTop: 4,
    position: "relative",
    // left: -32
  })
);

export default TextSection;
