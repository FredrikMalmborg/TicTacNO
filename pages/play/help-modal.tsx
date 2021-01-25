import React, { FC } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";

interface IProps {
  modalVisible: boolean;
  setVisible: (arg: boolean) => void;
}

const HelpModal: FC<IProps> = ({ modalVisible, setVisible, ...props }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setVisible(!modalVisible)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TicTacText
            size={40}
            centered
            style={{ margin: 10 }}
            label="Gameplay"
          />
          <ScrollView>
            <TicTacText
              size="sm"
              style={{ marginVertical: 10 }}
              label="Your goal is to NOT get three-in-a-row, contrary to the classic tic-tac-toe game. Whoever gets three-in-a-row first loses."
            />
            <TicTacText
              size="sm"
              style={{ marginVertical: 10 }}
              label="As you choose your cell, new available cells will generate throughout the session, giving you new options."
            />
            <TicTacText
              size="sm"
              style={{ marginVertical: 10 }}
              label="In order to play, you'll have to join a hosted room or host a room for one of your friends to join."
            />
          </ScrollView>
          <TicTacText
            label={"Close"}
            size="sm"
            centered
            button={{
              onClick: () => {
                setVisible(!modalVisible);
              },
              bgColor: colors.red,
              form: "square",
            }}
          />
        </View>
      </View>
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
    height: "100%",
    maxHeight: 450,
    padding: 25,
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
});

export default HelpModal;
