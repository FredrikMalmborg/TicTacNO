import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext, useEffect, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";
import RoomContext from "../../contexts/room/room-context";
import { StackParamlist } from "../page-navigation/PageNavigator";
import { Pages } from "../pages";

interface IProps {
  modalVisible: boolean;
  setVisible: (arg: boolean) => void;
  navigation: StackNavigationProp<StackParamlist>;
}

const JoinRoom: FC<IProps> = ({ modalVisible, setVisible, ...props }) => {
  const [roomId, setRoomId] = useState<string>("");
  const { roomStatus, roomContext } = useContext(RoomContext);

  useEffect(() => {
    if (roomStatus.success) {
      setTimeout(() => {
        roomContext.resetRoomStatus();
        setVisible(!modalVisible);
        props.navigation.navigate(Pages.JoinedRoom);
      }, 1000);
    }
  }, [roomStatus.success]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setVisible(!modalVisible)}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TicTacText label="Join room" />
            <TextInput
              style={styles.input}
              placeholder="Enter Room-ID"
              onChangeText={(text) => setRoomId(text)}
              value={roomId}
              // error={username.error}
            />
            <View
              style={{
                width: "100%",
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {roomStatus.loading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : roomStatus.errorMsg ? (
                <TicTacText
                  title
                  style={{ paddingBottom: 20 }}
                  label={`${roomStatus.errorMsg} :(`}
                  centered
                  size={30}
                />
              ) : roomStatus.success ? (
                <TicTacText
                  title
                  style={{ paddingBottom: 20 }}
                  label="Success! :)"
                  centered
                  size={30}
                />
              ) : (
                <TicTacText
                  title
                  style={{ paddingBottom: 20 }}
                  label="The Room-ID is the short code you are given when you host a room."
                  centered
                  size={18}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TicTacText
                label={"Cancel"}
                size="sm"
                centered
                button={{
                  onClick: () => {
                    setVisible(!modalVisible);
                  },
                  disabled: roomStatus.success,
                  bgColor: colors.red,
                  form: "square",
                }}
              />
              <TicTacText
                label="Join"
                size="sm"
                centered
                button={{
                  onClick: () => roomContext.joinRoom(roomId),
                  bgColor: { light: colors.teal.dark, dark: "rgba(0,0,0,.75)" },
                  form: "square",
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.65)",
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.teal.light,
    borderRadius: 20,
    width: "85%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 50,
    width: "100%",
    maxWidth: 300,

    marginVertical: 30,
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: "#fff",
    elevation: 3,
    borderRadius: 50,
  },
});

export default JoinRoom;
