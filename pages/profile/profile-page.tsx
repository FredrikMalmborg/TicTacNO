import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useContext } from "react";
import { StyleSheet, StyleProp, ViewStyle, SafeAreaView } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";
import AuthContext from "../../contexts/auth/auth-context";
import { StackParamlist } from "../page-navigation/PageNavigator";

interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  top: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist>;
}

const ProfilePage = ({ navigation }: Props) => {
  const { user, authContext } = useContext(AuthContext);
  const navigateBack = () => navigation.goBack();

  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={3} style={[style.section, style.top]}>
          <TicTacText title label="Profile" size="lg" />
        </Row>
        <Row size={4} style={style.section}>
          <TicTacText label={`Your username: ${user.userName}`} />
        </Row>
        <Row size={3} style={[style.section, style.bottom]}>
          <TicTacText
            label="Back"
            size="sm"
            button={{
              onClick: navigateBack,
              bgColor: colors.red,
              form: "square",
            }}
            color="white"
          />
          <TicTacText
            label="Log out"
            size="sm"
            centered
            button={{
              onClick: () => authContext.signOut(),
              bgColor: colors.red,
              form: "square",
            }}
          />
        </Row>
      </Grid>
    </SafeAreaView>
  );
};

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
  top: {
    padding: 50,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default ProfilePage;
