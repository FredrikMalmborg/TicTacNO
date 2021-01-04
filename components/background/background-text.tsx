import * as React from "react";
import { StyleProp, useWindowDimensions, View, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import TextSection from "./text-section";

interface IProps extends SvgProps {
  style: StyleProp<ViewStyle>;
}

const BackgroundText: React.FC<IProps> = ({ style, ...props }) => {
  const wH = useWindowDimensions().height;

  return (
    <View style={style}>
      {[...Array(Math.ceil(wH / 85) + 1)].map((_, i) => {
        const inverted = (i + 1) % 2
        return <TextSection {...props} rotation={inverted ? 180 : 0} />
      }
      )}
    </View>
  );
  // return (
  //   <View style={style}>
  //     <TextSection {...props} />
  //     <TextSection {...props} />
  //     <TextSection {...props} />
  //     <TextSection {...props} />
  //     <TextSection {...props} />
  //     <TextSection {...props} />
  //     <TextSection {...props} />
  //     <TextSection {...props} />
  //     <TextSection {...props} />
  //     <TextSection {...props} />
  //   </View>
  // );
};

export default BackgroundText;
