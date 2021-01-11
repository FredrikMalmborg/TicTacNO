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
  const [hasLogin, setHasLogin] = useState<boolean>(false);
  // const [user, setUser] = useState<any>(null);
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
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
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
          {hasLogin && (
            <TextInput
              style={style.input}
              placeholder="email"
              onChangeText={(text) => changeInputValue("email", text)}
              value={inputFields.email}
            />
          )}
          <TicTacText
            label={hasLogin ? "Register account" : "Log in"}
            size="sm"
            centered
            button={{
              onClick: () =>
                authContext.signIn({
                  type: "EMAIL",
                  payload: {
                    email: inputFields.email,
                    password: inputFields.password,
                  },
                }),
              bgColor: colors.teal,
              form: "square",
            }}
          />
          <View style={{ width: "85%" }}>
            {!hasLogin && (
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
              label={!hasLogin ? "Register with email" : "I have an account"}
              style={{ marginVertical: 30 }}
              size="sm"
              centered
              color="white"
              button={{
                onClick: () => setHasLogin(!hasLogin),
              }}
            />
          </View>
        </Row>
      </Grid>
    </TouchableWithoutFeedback>
  );
};

export default LoginPage;
