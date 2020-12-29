import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, Dimensions } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import Background from "../../components/background";

import {
    useFonts,
    FredokaOne_400Regular
  } from '@expo-google-fonts/fredoka-one'	

interface IStyles {
  container: StyleProp<ViewStyle>;
  cell: StyleProp<ViewStyle>;
  deactivated: StyleProp<ViewStyle>;
  empty: StyleProp<ViewStyle>;
  x: StyleProp<ViewStyle>;
  o: StyleProp<ViewStyle>;
}



const GamePage = () => {

    const [fontsLoaded /*, error */] = useFonts({FredokaOne_400Regular});

    const board = [
        [1,0,0,2,0],
        [2,1,1,1,0],
        [0,1,2,3,3],
        [1,1,2,1,0],
        [0,3,0,2,3]
    ]
    
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const length = windowWidth > windowHeight ? windowHeight : windowWidth

  return (
    <View style={[style.container,{width: length , height: length}]}>
        <Grid style={{width: '100%', height:'100%'}}>
        {
            board.map((row) => (
                <Row>
                    {
                        row.map((col) => {
                            switch(col) {
                                case 0: return <Col style={[style.cell,style.deactivated]}></Col>
                                case 1: return <Col style={[style.cell,style.empty]}></Col>
                                case 2: return <Col style={[style.cell,style.x]}>X</Col>
                                case 3: return <Col style={[style.cell, style.o]}>O</Col>
                            }
                        }
                        )
                    }      
                </Row>
            ))
        }
        </Grid>
    </View>
  );
};

const style: IStyles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent:"center",
    alignItems: "center",
    
    padding: 30,
},
cell: {
      justifyContent:"center",
      alignItems: "center",
      fontFamily: 'FredokaOne_400Regular',
      color: '#fff',
      fontSize:80,

      margin: 10,
      borderRadius: 10,

      border: '3px solid'
},

deactivated: {
    opacity: 0.33
},
empty: {
    borderColor: "#D7D7D7",
    backgroundColor: "#fff",
    boxShadow: '-4px 4px 0px #D7D7D7'
},
x: {
    borderColor:'#BB2832',
    backgroundColor: "#fa5457",
    boxShadow: '-4px 4px 0px #BB2832'
},
o: {
    borderColor:'#0B797D',
    backgroundColor: "#03D2DB",
    boxShadow: '-4px 4px 0px #0B797D'
  },
});

export default GamePage;
