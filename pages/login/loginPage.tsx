import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  SafeAreaView,
  View,
} from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import * as Google from "expo-google-app-auth";
// import * as GoogleSignIn from 'expo-google-sign-in';

import Logotype from "../../components/logotype";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";
import { StackParamlist } from "../page-navigation/PageNavigator";

import { Pages } from "../pages";
// import firebase from "firebase";
import { TextInput } from "react-native-gesture-handler";
interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;
  top: StyleProp<ViewStyle>;
  input: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist, "LoginPage">;
}

const LoginPage = ({ navigation }: Props) => {
  // const provider = new firebase.auth.GoogleAuthProvider()
  const [hasLogin, setHasLogin] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [inputFields, setInputFields] = useState<{
    email: string;
    password: string;
    passwordConfirm: string;
  }>({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const changeInputValue = (anchor: string, value: string) => {
    setInputFields({
      ...inputFields,
      [anchor]: value,
    });
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
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    bottom: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    input: {
      height: 40,
      width: "80%",
      maxWidth: 300,

      margin: 20,
      paddingHorizontal: 20,
      paddingVertical: 6,
      backgroundColor: "#fff",
      elevation: 3,
      borderRadius: 50,
    },
  });

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={2} style={[style.section]}>
          <Logotype width="90%" height="100%" />
        </Row>
        <Row size={3} style={[style.section, style.top]}>
          <TicTacText
            label={!hasLogin ? "Login" : "Register"}
            centered
            style={{
              marginBottom: 20,
              backgroundColor: "#2221",
              width: "100%",
            }}
          />

          <TextInput
            style={style.input}
            placeholder="email"
            onChangeText={(text) => changeInputValue("email", text)}
            value={inputFields.email}
          />
          <TextInput
            style={style.input}
            placeholder="password"
            onChangeText={(text) => changeInputValue("password", text)}
            value={inputFields.password}
          />
          {hasLogin ? (
            <TextInput
              style={style.input}
              placeholder="email"
              onChangeText={(text) => changeInputValue("email", text)}
              value={inputFields.email}
            />
          ) : (
            <View>
              <TicTacText
                label="google"
                size={30}
                centered
                button={{
                  onClick: () => console.log("google"),
                  bgColor: colors.red.light,
                  form: "square",
                }}
              />
              <TicTacText
                label="facebook"
                size={30}
                centered
                button={{
                  onClick: () => console.log("facebook"),
                  bgColor: colors.red.light,
                  form: "square",
                }}
              />
            </View>
          )}
        </Row>

        <Row size={1} style={[style.section, style.bottom]}>
          <TicTacText
            label={!hasLogin ? "Don't have an account?" : "I have an account"}
            size="sm"
            color={"#222"}
            button={{
              onClick: () => setHasLogin(!hasLogin),
            }}
          />
        </Row>
      </Grid>
    </SafeAreaView>
  );
};

export default LoginPage;
