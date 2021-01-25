import React, { memo } from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Platform,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Svg, Image as SvgImage } from "react-native-svg";

type Size = "sm" | "md" | "lg" | number;

interface IStyles {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
  button: StyleProp<ViewStyle>;
  round: StyleProp<ViewStyle>;
  square: StyleProp<ViewStyle>;
  disabledButton: StyleProp<ViewStyle>;
  enabledButton: StyleProp<ViewStyle>;
}

type Button = {
  form?: "square" | "round";
  bgColor?: { light: string; dark: string };
  disabled?: boolean;
  onClick: () => any;
};
interface Props {
  label?: string;
  title?: boolean;
  bread?: boolean;
  size?: Size | number;
  centered?: boolean;
  color?: string;
  button?: Button;
  style?: StyleProp<ViewStyle>;
}

const TicTacText = ({
  size,
  title,
  label,
  bread,
  centered,
  color,
  button,
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
        return size || 50;
    }
  };
  const getImgUri = () => {
    switch (label?.toLocaleLowerCase()) {
      case "play":
        return require("../../assets/images/text/lowercase/Play_PNG.png");
      case "profile":
        return require("../../assets/images/text/lowercase/Profile_PNG.png");
      case "join":
        return require("../../assets/images/text/lowercase/Join_PNG.png");
      case "host":
        return require("../../assets/images/text/lowercase/Host_PNG.png");
      case "about us":
        require("../../assets/images/text/lowercase/About-us_PNG.png");
      case "help":
        return require("../../assets/images/text/lowercase/Help_PNG.png");
      case "matchmaking":
        return require("../../assets/images/text/lowercase/Matchmaking_PNG.png");
      case "back":
        return require("../../assets/images/text/lowercase/Back_PNG.png");
    }
  };
  const getImg = () => {
    const img = getImgUri();
    const dippers = ["y", "g", "p", "q", "j"];
    const dipper =
      label && new RegExp(dippers.join("|")).test(label.substring(1));

    const SVG_STYLE = [
      style.container,
      {
        height: getSize() * (dipper && img ? 1.32486 : 1),
      },
    ];
    const SVG_TEXT = (
      <Svg width="100%" height="100%">
        <SvgImage width="100%" height="100%" href={img} />
      </Svg>
    );

    return img ? (
      <View style={[SVG_STYLE, props.style]}>{SVG_TEXT}</View>
    ) : (
      getText()
    );
  };
  const getText = () => {
    return (
      <View
        style={[
          title && { width: "100%" },
          props.style,
          button?.disabled && { opacity: 0.3 },
        ]}
      >
        <Text style={style.text}>{label}</Text>
      </View>
    );
  };

  const style: IStyles = StyleSheet.create({
    container: {
      width: useWindowDimensions().width,
      margin: bread ? 0 : 10,
    },
    text: {
      ...Platform.select({
        ios: {
          fontFamily: bread ? "Helvetica" : "FredokaOne_400Regular",
        },
        android: {
          fontFamily: bread ? "sans-serif" : "FredokaOne_400Regular",
        },
        default: {
          fontFamily: bread ? "sans-serif" : "FredokaOne_400Regular",
        },
      }),
      fontSize: getSize(),
      textAlign: centered ? "center" : "left",
      color: color ? color : "#fff",
    },
    button: {
      backgroundColor: button?.bgColor?.light,
      paddingHorizontal: 15,
      paddingVertical: 8,
      margin: 6,
      ...Platform.select({
        ios: {
          shadowRadius: 0,
          shadowColor: button?.bgColor?.dark,
          shadowOpacity: .9,
          shadowOffset: {
            height: 3,
            width: -3,
          },
        },
        android: {
          elevation: 3,
        },
      }),
    },
    round: {
      borderRadius: 100,
    },
    square: {
      borderRadius: 10,
    },
    disabledButton: {
      opacity: 0.3,
    },
    enabledButton: {
      opacity: 1,
    },
  });

  const content = title ? getImg() : getText();

  return button ? (
    <TouchableOpacity
      disabled={button.disabled}
      onPress={() => button.onClick()}
      style={[
        button.form && style.button,
        button.form === "round" ? style.round : style.square,
      ]}
    >
      {content}
    </TouchableOpacity>
  ) : (
    <>{content}</>
  );
};

export default memo(TicTacText);
