import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, Button } from "react-native";
import TicTacText from "../../components/text/Text";
import { StackParamlist } from "../PageNavigator";

import { Pages } from "../pages";

interface IStyles {
    container: StyleProp<ViewStyle>;
}

interface Props {
    navigation: StackNavigationProp<StackParamlist, 'StartPage'>;
}

const PlayPage = ({ navigation }: Props) => {
    return (
        <View style={style.container}>
            <TicTacText title label="test" size="md" color="#f44" />
            <Button title="sdasdasd" onPress={() => navigation.navigate(Pages.Start)} />
        </View>
    );
};

const style: IStyles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        paddingTop: 16,
        width: "100%",
        height: "100%",
    },
});

export default PlayPage;
