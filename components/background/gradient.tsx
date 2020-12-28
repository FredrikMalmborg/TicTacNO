import React from "react";
import Svg, {
  SvgProps,
  Defs,
  RadialGradient,
  Stop,
  Path,
} from "react-native-svg";
import { useWindowDimensions, View } from "react-native";

// created using: https://react-svgr.com/playground/?native=true&typescript=true

const Gradient = ({ style, ...props }: SvgProps) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  return (
    <View style={style}>
      <Svg viewBox={`0 0 ${windowWidth} ${windowHeight}`} {...props}>
        <Defs>
          <RadialGradient
            id="prefix__a"
            cx="85%"
            cy="15%"
            r="80%"
            fx="95%"
            fy="5%"
          >
            <Stop offset={0.4} stopColor="#ffd148" />
            <Stop offset={1} stopColor="#ea555a" />
          </RadialGradient>
        </Defs>
        <Path
          fillOpacity={0.45}
          fill="url(#prefix__a)"
          d={`M0 0
            h${windowWidth}
            v${windowHeight}
            H0z`}
          data-name="Lager 2"
        />
      </Svg>
    </View>
  );
};

export default Gradient;
