import React, { FC } from "react";
import { Modal, View, StyleSheet } from "react-native";
import TicTacText from "../../components/text/Text";

interface IProps {
  modalVisible: boolean;
  setVisible: (arg: boolean) => void;
  label: string;
}

const GameInfoModal: FC<IProps> = ({
  modalVisible,
  setVisible,
  label,
  ...props
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setVisible(!modalVisible)}
    >
      <View style={styles.centeredView}>
        <TicTacText
          title
          style={{ paddingBottom: 20 }}
          label={label}
          centered
          size="md"
        />
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
});

export default GameInfoModal;
