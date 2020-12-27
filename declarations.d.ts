declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}


// Package didn't work...

// declare module "react-native-radial-gradient" 
// {
//   import React from "react";
//   import { StyleProp, ViewStyle } from "react-native";

//   declare class RadialGradient extends React.Component<{
//     style?: StyleProp<ViewStyle>;
//     center?: number[];
//     colors?: string[];
//     stops?: number[];
//     radius?: number;
//   }> {}
//   export default RadialGradient;
// }
