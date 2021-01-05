import * as React from "react";
import { StyleProp, useWindowDimensions, View, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import TextSection from "./text-section";

interface IProps extends SvgProps {
  style: StyleProp<ViewStyle>;
}

const BackgroundText: React.FC<IProps> = ({ style, ...props }) => {
  const rows = Math.ceil(useWindowDimensions().height / 80);

  return (
    <View style={style}>
      {[...Array(rows)].map((_, i) => {
        const inverted = (i + 1) % 2
        return <TextSection
          key={i} {...props}
          row={i}
          inverted={inverted} />
      }
      )}
    </View>
  );
};

export default BackgroundText;
