import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase";
import React, { useContext } from "react";
import { StyleSheet, StyleProp, ViewStyle, SafeAreaView } from "react-native";
import { Grid, Row } from "react-native-easy-grid";

import Logotype from "../../components/logotype";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";
import AuthContext from "../../contexts/auth/auth-context";
import { StackParamlist } from "../page-navigation/PageNavigator";

import { Pages } from "../pages";
interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;

  animate: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist, "StartPage">;
}

const StartPage = ({ navigation }: Props) => {
  const { authContext } = useContext(AuthContext);

  const style: IStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "#F220",
    },
    section: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    bottom: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    animate: {},
  });

  const navigateToPlay = () => navigation.navigate(Pages.Play);

  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={2} style={[style.section]}>
          <Logotype width="90%" height="100%" />
        </Row>
        <Row size={3} style={style.section}>
          <TicTacText
            title
            label="play"
            size="md"
            button={{ onClick: navigateToPlay }}
          />
          <TicTacText title label="profile" size="md" />
        </Row>
        <Row size={1} style={[style.section, style.bottom]}>
          <TicTacText label="Logout" size="sm" button={{
            onClick: () => authContext.signOut(),
            form: "round", bgColor: colors.teal
          }} />
        </Row>
      </Grid>
    </SafeAreaView>
  );
};

export default StartPage;
