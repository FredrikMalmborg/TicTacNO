import { StackNavigationProp } from "@react-navigation/stack";
import React, { useRef } from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle, Animated } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
// import  from "react-native-reanimated";
import Logotype from "../../components/logotype";
import TicTacText from "../../components/text/Text";
import AnimTEST from "../animation_TEST/anim";
import { StackParamlist } from "../PageNavigator";

import { Pages } from "../pages";
interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  top: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;

  animate: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist, 'StartPage'>;
}

const StartPage = ({ navigation }: Props) => {

  const style: IStyles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      alignItems: "center",
      // paddingTop: 16,
      width: "100%",
      height: "100%",
      backgroundColor: '#F220'
    },
    section: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    },
    top: {
      padding: 50
    },
    bottom: {
      flexDirection: "row",
      justifyContent: "space-evenly"
    },
    animate: {

    }
  });

  const navigateToPlay = () => navigation.navigate(Pages.Play)

  return (
    <View style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={1} style={[style.section, style.top]}>
          <Logotype width="90%" height="100%" />
        </Row>
        <Row size={4} style={style.section}>
          <TicTacText title label="play" size='md' button={{ onClick: navigateToPlay }} />
          <TicTacText title label="profile" size='md' />
        </Row>
        <Row size={1} style={[style.section, style.bottom]}>
          {/* <AnimTEST /> */}
          <TicTacText label="About us" size="md" color="white" />
        </Row>
      </Grid>
    </View>
  );
};


export default StartPage;
