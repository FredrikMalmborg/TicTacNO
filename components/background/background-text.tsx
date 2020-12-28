import * as React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import TextSection from "./text-section";

interface IProps extends SvgProps {
  style: StyleProp<ViewStyle>
}

const BackgroundText: React.FC<IProps> = ({style, ...props}) => {

  return (
    <View style={style}>
      <TextSection {...props} />
      <TextSection {...props} />
      <TextSection {...props} />
      <TextSection {...props} />
      <TextSection {...props} />
      <TextSection {...props} />
      <TextSection {...props} />
      <TextSection {...props} />
      <TextSection {...props} />
      <TextSection {...props} />
    </View>
  );
}

export default BackgroundText;
