import React from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Svg, Image as SvgImage } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";

import PLAY_PNG from "../../assets/images/text/PLAY_PNG.png";
import PROFILE_PNG from "../../assets/images/text/PROFILE_PNG.png";
import HOST_PNG from "../../assets/images/text/HOST_PNG.png";
import JOIN_PNG from "../../assets/images/text/JOIN_PNG.png";
import HELP_PNG from "../../assets/images/text/HELP_PNG.png";
import BACK_PNG from "../../assets/images/text/BACK_PNG.png";
import MATCHMAKING_PNG from "../../assets/images/text/MATCHMAKING_PNG.png";
import ABOUTUS_PNG from "../../assets/images/text/ABOUTUS_PNG.png";

type Size = "sm" | "md" | "lg" | number;

interface IStyles {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
}

interface Props {
  children?: React.ReactNode;
  label?: string;
  title?: boolean;
  bread?: boolean;
  size?: Size;
  centered?: boolean;
  color?: string;
  button?: {
    form?: "square" | "rounded";
    bgColor?: string;
    onClick: () => any;
  };
}

const TicTacText = ({
  size,
  title,
  label,
  bread,
  centered,
  color,
  children,
  ...props
}: Props) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return 25;
      case "md":
        return 50;
      case "lg":
        return 100;
      default:
        return size;
    }
  };
  const getImg = () => {
    let img;
    switch (label?.toLocaleLowerCase()) {
      case "play":
        img = PLAY_PNG;
        break;
      case "profile":
        img = PROFILE_PNG;
        break;
      case "join":
        img = JOIN_PNG;
        break;
      case "host":
        img = HOST_PNG;
        break;
      case "about us":
        img = ABOUTUS_PNG;
        break;
      case "help":
        img = HELP_PNG;
        break;
      case "matchmaking":
        img = MATCHMAKING_PNG;
        break;
      case "back":
        img = BACK_PNG;
        break;
    }

    const SVG_STYLE = [style().container, { height: getSize() }];
    const SVG_TEXT = (
      <Svg width="100%" height="100%">
        <SvgImage width="100%" height="100%" href={img} />
      </Svg>
    );

    return img ? (
      props.button ? (
        <TouchableOpacity
          style={SVG_STYLE}
          onPress={() => props.button?.onClick()}
        >
          {SVG_TEXT}
        </TouchableOpacity>
      ) : (
        <View style={SVG_STYLE}>{SVG_TEXT}</View>
      )
    ) : (
      getText()
    );
  };
  const getText = () => {
    return props.button ? (
      <TouchableOpacity
        style={title && { width: "100%" }}
        onPress={() => props.button?.onClick()}
      >
        <Text style={style({ bread }, getSize(), centered, color).text}>
          {children ? children : label}
        </Text>
      </TouchableOpacity>
    ) : (
      <View style={title && { width: "100%" }}>
        <Text style={style({ bread }, getSize(), centered, color).text}>
          {children ? children : label}
        </Text>
      </View>
    );
  };

  return <>{title ? getImg() : getText()}</>;
};

const style = (
  type?: { bread?: boolean; title?: boolean },
  size?: number,
  centered?: boolean,
  color?: string
): IStyles => {
  return StyleSheet.create({
    container: {
      width: useWindowDimensions().width,
      margin: type?.bread ? 0 : 10,
    },
    text: {
      ...Platform.select({
        ios: {
          fontFamily: type?.bread ? "Helvetica" : "FredokaOne_400Regular",
        },
        android: {
          fontFamily: type?.bread ? "sans-serif" : "FredokaOne_400Regular",
        },
        default: {
          fontFamily: type?.bread ? "sans-serif" : "FredokaOne_400Regular",
        },
      }),
      fontSize: size || 20,
      textAlign: centered ? "center" : "left",
      color: color ? color : "#000",
    },
  });
};

export default TicTacText;
