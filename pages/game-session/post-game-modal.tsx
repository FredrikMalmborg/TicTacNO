import React, { FC, useContext, useEffect, useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";
import AuthContext from "../../contexts/auth/auth-context";
import RoomContext from "../../contexts/room/room-context";

interface IProps {
  modalVisible: boolean;
  setVisible: (arg: boolean) => void;
  destroyRoom: () => void;
  leaveRoom: () => void;
  condition: "HOST" | "JOIN";
}

interface IRematchState {
  possible: boolean;
  message: string;
}

const INITIAL_REMATCH: IRematchState = {
  possible: true,
  message: "Waiting for players...",
};

const PostGameModal: FC<IProps> = ({
  modalVisible,
  setVisible,
  condition,
  ...props
}) => {
  const {
    roomState: { rematchValidity, player1, player2, losingPlayer },
    roomContext,
  } = useContext(RoomContext);
  const {
    userStatus: { userToken },
  } = useContext(AuthContext);
  const [rematch, setRematch] = useState<IRematchState>(INITIAL_REMATCH);
  const leaveAsJoiner = () => {
    setVisible(!modalVisible);
    roomContext.updateRematchValidity(false);
    props.leaveRoom();
  };
  // const prevState = useRef({ rematchValidity, player1, player2 }).current;

  const leaveAsHost = () => {
    setVisible(!modalVisible);
    props.destroyRoom();
  };

  useEffect(() => {
    const { player1: player1Req, player2: player2Req } = rematchValidity;
    let resetTimeout: undefined | NodeJS.Timeout = undefined;
    if (!player1 || !player2) {
      setRematch({ possible: false, message: "Opponent left the game" });
      resetTimeout = setTimeout(() => {
        roomContext.resetGame();
        setRematch(INITIAL_REMATCH);
        setVisible(false);
      }, 2000);
    } else {
      // const yourPlayer = userToken === player1.id ? "player1" : "player2"
      if (!player1Req && !player2Req) {
        setRematch(INITIAL_REMATCH);
      } else {
        if (player1Req && player2Req) {
          roomContext.restartGame();
          setRematch(INITIAL_REMATCH);
          setVisible(false);
        } else if (
          (!player1Req && player2Req === userToken) ||
          (!player2Req && player1Req === userToken)
        ) {
          setRematch({
            possible: false,
            message: "You've requested a rematch!",
          });
        } else {
          setRematch({
            possible: true,
            message: "Opponent has requested a rematch!",
          });
        }
      }
    }
    return () => {
      if (resetTimeout) {
        clearTimeout(resetTimeout);
      }
    };
  }, [rematchValidity, player2]);

  const requestRematch = () => {
    roomContext.updateRematchValidity(true);
  };

  const gameResult = userToken === losingPlayer?.id ? "lost!" : "won!";

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
            title
            style={{ paddingBottom: 20 }}
            label={`You ${gameResult}`}
            centered
            size="md"
          />
          <View style={{ flexGrow: 1, width: "100%" }}>
            <TicTacText size={35} centered label="Stats" />
            <TicTacText
              size="sm"
              style={{ paddingVertical: 10 }}
              centered
              label="Future usage is showing stats like wins/losses against opponent maybe"
            />
          </View>
          <View
            style={{
              width: "100%",
              margin: 10,
            }}
          >
            <TicTacText size={20} centered label="Rematch:" />
            <View
              style={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: "rgba(255,255,255,.6)",
                borderStyle: "dotted",
                padding: 10,
                margin: 4,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TicTacText
                style={{
                  paddingVertical: 10,
                }}
                size={20}
                centered
                label={rematch.message}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TicTacText
              label="Quit"
              centered
              size="sm"
              button={{
                onClick: condition === "HOST" ? leaveAsHost : leaveAsJoiner,
                bgColor: colors.red,
                form: "square",
                disabled: !player1 || !player2,
              }}
            />
            <TicTacText
              label="Play again"
              centered
              size="sm"
              button={{
                onClick: requestRematch,
                bgColor: { light: colors.teal.dark, dark: "rgba(0,0,0,.75)" },
                form: "square",
                disabled: !rematch.possible,
              }}
            />
          </View>
        </View>
        {/* <TicTacText
          title
          style={{ paddingBottom: 20 }}
          label="See final gameboard"
          centered
          size="sm"
        /> */}
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
    flex: 1,
    margin: 20,
    backgroundColor: colors.teal.light,
    borderRadius: 20,
    width: "85%",
    maxWidth: 375,
    maxHeight: 575,
    padding: 25,
    alignItems: "center",
    justifyContent: "space-between",
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

export default PostGameModal;
