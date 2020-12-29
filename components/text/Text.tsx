import React from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Platform,
} from "react-native";
import { Svg, Image } from "react-native-svg";

import Play_PNG from "../../assets/images/text/Play_PNG.png";
import Profile_PNG from "../../assets/images/text/Profile_PNG.png";
import Host_PNG from "../../assets/images/text/Host_PNG.png";
import Join_PNG from "../../assets/images/text/Join_PNG.png";

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
  // const imgScale: string = getScale();
  const getImg = () => {
    let img;
    switch (label?.toLocaleLowerCase()) {
      case "play":
        img = Play_PNG;
        break;
      case "profile":
        img = Profile_PNG;
        break;
      case "join":
        img = Join_PNG;
        break;
      case "host":
        img = Host_PNG;
        break;
    }

    return (
      <Svg style={style().container} height={getSize()}>
        <Image width="100%" height={"100%"} href={img} />
      </Svg>
    );
  };
  const getText = () => {
    return (
      <View style={style({ bread }).container}>
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
      width: "100%",
      margin: type?.bread ? "" : 10,
    },
    text: {
      ...Platform.select({
        ios: {
          fontFamily: type?.bread ? "Helvetica" : "FredokaOne_400Regular"
        },
        android: {
          fontFamily: type?.bread ? "sans-serif" : "FredokaOne_400Regular"
        },
        default: {
          fontFamily: type?.bread ? "sans-serif" : "FredokaOne_400Regular"
        }
      }),
      // fontFamily: type?.bread ? Platform.OS === "ios" ? "Helvetica" : s,
      fontSize: size || 20,
      textAlign: centered ? "center" : "left",
      color: color ? color : "#000"
    },
  });
};

export default TicTacText;
