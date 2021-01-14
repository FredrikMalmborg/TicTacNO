import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import { TextInput } from "react-native-gesture-handler";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";
import AuthContext from "../../contexts/auth/auth-context";
import { StackParamlist } from "../page-navigation/PageNavigator";

interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  top: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;
  input: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist, "PlayPage">;
}

const InitialSetup = ({ navigation }: Props) => {
  const { authContext } = useContext(AuthContext);
  const [username, setUserName] = useState<{
    value: string;
    error: boolean;
  }>({
    value: "",
    error: false,
  });

  const style: IStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#F220",
    },
    section: {
      width: "90%",
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
    input: {
      height: 40,
      width: "80%",
      maxWidth: 300,

      margin: 15,
      paddingHorizontal: 20,
      paddingVertical: 6,
      backgroundColor: "#fff",
      elevation: 3,
      borderRadius: 50,
    },
  });

  const changeUserName = (text: string) => {
    setUserName((prevState) => ({ ...prevState, value: text, error: false }));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={style.container}>
        <Grid style={{ flex: 1, width: "100%", alignItems: "center" }}>
          <Row size={1} style={[style.section, style.top]}>
            <TicTacText title label="Welcome!" centered size="md" />
            <TicTacText title label="Almost done..." centered size="sm" />
          </Row>
          <Row size={4} style={style.section}>
            <TicTacText title label="Choose a username:" centered size="sm" />
            <TextInput
              style={style.input}
              placeholder="3-12 characters"
              onChangeText={(text) => changeUserName(text)}
              value={username.value}
              // error={username.error}
            />
            <TicTacText
              title
              label="Your username will be displayed ingame and should be between 3 and 12 characters."
              centered
              size={18}
            />
          </Row>
          <Row size={2} style={[style.section, style.bottom]}>
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
            <TicTacText
              label="Continue"
              size="sm"
              centered
              button={{
                onClick: () => authContext.setUserName(username.value),
                disabled: username.value.length < 3 || username.value.length > 12,
                bgColor: colors.teal,
                form: "square",
              }}
            />
          </Row>
        </Grid>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default InitialSetup;
