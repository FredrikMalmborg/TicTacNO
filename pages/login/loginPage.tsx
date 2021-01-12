import React, { useContext, useState } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import Logotype from "../../components/logotype";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import AuthContext from "../../contexts/auth/auth-context";
interface IStyles {
  section: StyleProp<ViewStyle>;
  content: StyleProp<ViewStyle>;
  input: StyleProp<ViewStyle>;
}

const LoginPage = () => {
  // const provider = new firebase.auth.GoogleAuthProvider()
  const [register, setRegister] = useState<boolean>(false);
  const [inputFields, setInputFields] = useState<{
    email: string;
    password: string;
    passwordConfirm: string;
  }>({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { authContext } = useContext(AuthContext);

  const changeInputValue = (anchor: string, value: string) => {
    setInputFields({
      ...inputFields,
      [anchor]: value,
    });
  };

  const isDisabled = (field: "login" | "register") => {
    const { email, password, passwordConfirm } = inputFields
    const checkEmail = () => {
      const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return res.test(String(email).toLowerCase());
    }

    if (field === "login") return (checkEmail() && password.length > 3)
    if (field === "register") return (checkEmail() && password.length > 3 && password === passwordConfirm)
  }

  const style: IStyles = StyleSheet.create({
    section: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    content: {
      flexDirection: "column",
      justifyContent: "center",
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Grid>
        <Row size={2} style={[style.section]}>
          <Logotype width="90%" height="100%" />
        </Row>
        <Row size={4} style={[style.section, style.content]}>
          <TextInput

            style={style.input}
            placeholder="Email-address"
            onChangeText={(text) => changeInputValue("email", text)}
            value={inputFields.email}
          />
          <TextInput
            style={style.input}
            placeholder="Password"
            onChangeText={(text) => changeInputValue("password", text)}
            value={inputFields.password}
          />
          {register && (
            <TextInput
              style={style.input}
              placeholder="confirm password"
              onChangeText={(text) => changeInputValue("passwordConfirm", text)}
              value={inputFields.passwordConfirm}
            />
          )}
          <TicTacText
            label={register ? "Register account" : "Log in"}
            size="sm"
            centered
            button={
              {
                onClick: register ? () => authContext.signUp({
                  email: inputFields.email,
                  password: inputFields.password,
                  passwordConfirm: inputFields.passwordConfirm
                }) :
                  () =>
                    authContext.signIn({
                      type: "EMAIL",
                      payload: {
                        email: inputFields.email,
                        password: inputFields.password,
                      },
                    }),
                bgColor: colors.teal,
                form: "square",
                disabled: (() => {

                  const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if (
                    (register ? inputFields.passwordConfirm === inputFields.password : true)
                    && inputFields.password.length > 5
                    && res.test(String(inputFields.email).toLowerCase())) return false
                  return true
                })()
              }
            }
          />
          <View style={{ width: "85%" }}>
            {!register && (
              <>
                <TicTacText
                  label="or continue with:"
                  size={20}
                  centered
                  color="white"
                  style={{ margin: 10 }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TicTacText
                    label="Google"
                    size="sm"
                    centered
                    button={{
                      onClick: () => authContext.signIn({ type: "GOOGLE" }),
                      bgColor: colors.red,
                      form: "square",
                    }}
                  />
                  <TicTacText
                    label="Facebook"
                    size="sm"
                    centered
                    button={{
                      onClick: () => authContext.signIn({ type: "FACEBOOK" }),
                      bgColor: colors.red,
                      form: "square",
                    }}
                  />
                </View>
              </>
            )}
            <TicTacText
              label={!register ? "Register with email" : "I have an account"}
              style={{ marginVertical: 30 }}
              size="sm"
              centered
              color="white"
              button={{
                onClick: () => setRegister(!register)
              }}
            />
          </View>
        </Row>
      </Grid>
    </TouchableWithoutFeedback>
  );
};

export default LoginPage;
