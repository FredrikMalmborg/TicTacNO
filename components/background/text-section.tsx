import * as React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Svg, { SvgProps, G, Path } from "react-native-svg";

const TextSection = ({ width, height, ...props }: SvgProps) => {
  return (
    <View style={styles(width, height)}>
      <Svg viewBox={`0 0 600 85`} width="100%" height="100%" {...props}>
        <G id="prefix__Lager_5" data-name="Lager 5">
          <Path
            fill="#ea565a"
            opacity="0.1"
            d="M653.48 0a43 43 0 1043 43 43 43 0 00-43-43zm0 57.87A14.92 14.92 0 11668.4 43a14.92 14.92 0 01-14.92 14.87z"
          />
          <Path
            fill="#ea565a"
            opacity="0.1"
            d="M586.32 43.26L606.62 23a6.37 6.37 0 000-9l-11.9-11.9a6.37 6.37 0 00-9 0l-20.3 20.3-20.3-20.3a6.37 6.37 0 00-9 0L524.2 14a6.37 6.37 0 000 9l20.3 20.3-20.3 20.3a6.37 6.37 0 000 9l11.9 11.9a6.37 6.37 0 009 0l20.3-20.3 20.3 20.3a6.37 6.37 0 009 0l11.9-11.9a6.37 6.37 0 000-9z"
          />
          <Path
            fill="#ea565a"
            opacity="0.1"
            d="M479.37.09a43 43 0 1043 43 43 43 0 00-43-43zm0 57.87a14.92 14.92 0 1114.92-14.91A14.91 14.91 0 01479.37 58z"
          />
          <Path
            fill="#ea565a"
            opacity="0.1"
            d="M412.21 43.35l20.3-20.3a6.37 6.37 0 000-9l-11.9-11.9a6.37 6.37 0 00-9 0l-20.3 20.3L371 2.14a6.37 6.37 0 00-9 0L350.09 14a6.37 6.37 0 000 9l20.3 20.3-20.3 20.3a6.37 6.37 0 000 9L362 84.57a6.39 6.39 0 009 0l20.3-20.31 20.3 20.31a6.39 6.39 0 009 0l11.9-11.91a6.37 6.37 0 000-9z"
          />
          <Path
            fill="#ea565a"
            opacity="0.1"
            d="M305.26.14a43 43 0 1043 43 43 43 0 00-43-43zm0 57.87a14.92 14.92 0 1114.92-14.92A14.92 14.92 0 01305.26 58z"
          />
          <Path
            fill="#ea565a"
            opacity="0.1"
            d="M238.1 43.4l20.3-20.3a6.37 6.37 0 000-9L246.5 2.19a6.37 6.37 0 00-9 0l-20.3 20.3-20.3-20.3a6.37 6.37 0 00-9 0L176 14.09a6.37 6.37 0 000 9l20.3 20.3L176 63.7a6.37 6.37 0 000 9l11.9 11.9a6.37 6.37 0 009 0l20.3-20.3 20.3 20.3a6.37 6.37 0 009 0l11.9-11.9a6.37 6.37 0 000-9z"
          />
          <Path
            fill="#ea565a"
            opacity="0.1"
            d="M131.15.23a43 43 0 1043 43 43 43 0 00-43-43zm0 57.87a14.92 14.92 0 1114.92-14.91 14.92 14.92 0 01-14.92 14.91z"
          />
          <Path
            fill="#ea565a"
            opacity="0.1"
            d="M64 43.49l20.3-20.3a6.37 6.37 0 000-9L72.39 2.28a6.37 6.37 0 00-9 0l-20.3 20.3-20.31-20.3a6.37 6.37 0 00-9 0L1.87 14.18a6.37 6.37 0 000 9l20.3 20.3-20.3 20.31a6.37 6.37 0 000 9l11.9 11.9a6.37 6.37 0 009 0l20.3-20.3 20.3 20.3a6.37 6.37 0 009 0l11.9-11.9a6.37 6.37 0 000-9z"
          />
        </G>
      </Svg>
    </View>
  );
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
