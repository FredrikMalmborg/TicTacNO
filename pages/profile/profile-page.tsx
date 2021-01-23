import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  SafeAreaView,
  View,
} from "react-native";
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
        <Row size={7} style={[style.section, style.top]}>
          {user.userName && (
            <View
              style={{
                backgroundColor: colors.teal.light,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <TicTacText size={30} label={user.userName} />
            </View>
          )}
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TicTacText size={30} centered label="Statistics" />
            <View style={{ width: "80%", maxWidth: 200 }}>
              <TicTacText size="sm" label={`Wins: 0`} />
              <TicTacText size="sm" label={`Losses: 0`} />
              <TicTacText size="sm" label={`Winrate: 0`} />
            </View>
          </View>
          <TicTacText
            label="Game history"
            size="sm"
            button={{
              onClick: () => console.log("history")
              ,
              bgColor: colors.teal,
              form: "square",
              disabled: true
            }}
            color="white"
          />
          <TicTacText
            label="Remove account"
            size="sm"
            button={{
              onClick: () => console.log("Remove account")
              ,
              bgColor: colors.red,
              form: "square",
              disabled: true
            }}
            color="white"
          />
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
    paddingTop: 50,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default ProfilePage;
