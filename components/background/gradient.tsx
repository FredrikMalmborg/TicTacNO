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

const Gradient = () => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  return (
    <View>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"

      >
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
            h100
            v100  
            H0z`}
          data-name="Lager 2"
        />
      </Svg>
    </View>
  );
};

export default Gradient;
