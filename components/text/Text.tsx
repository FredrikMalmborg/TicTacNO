import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle, StyleSheet, ImageStyle } from 'react-native'
import { Svg, Path, Image } from 'react-native-svg'

import Play_PNG  from "../../assets/images/text/Play_PNG.png";
import Profile_PNG  from "../../assets/images/text/Profile_PNG.png";
import Host_PNG  from "../../assets/images/text/Host_PNG.png";  
import Join_PNG  from "../../assets/images/text/Join_PNG.png";



import {
    useFonts,
    FredokaOne_400Regular
  } from '@expo-google-fonts/fredoka-one'	

type Size = "sm" | "md" | "lg" | number

interface IStyles {
    container: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
  }

interface Props {
    children?: React.ReactNode
    label?: string
    title?: boolean  
    bread?: boolean  
    size?: Size 
}

const TicTacText = (props: Props) => {
    const [fontsLoaded /*, error */] = useFonts({FredokaOne_400Regular});
    const [content, setContent] = React.useState(<></>)
    
    const {size, title, label, bread, children} = props
    
    const getSize = () => {
        switch(size) {
            case 'sm': return 25 
            case 'md': return 50 
            case 'lg': return 100 
            default: return size
        }
    }
    // const imgScale: string = getScale();
    const getImg = () => {
        let img
        switch(label?.toLocaleLowerCase()) {
            case 'play' : img = Play_PNG; break;
            case 'profile' : img = Profile_PNG; break;
            case 'join' : img = Join_PNG; break;
            case 'host' : img = Host_PNG; break;
        }
        
        return (
        <Svg style={style().container} height={getSize()}>
            <Image width="100%" height={"100%"} href={img}/>
        </Svg>)
    }
    const getText = () => {
        return (
        <View style={style({bread}).container}>
            <Text style={style({bread}, getSize()).text}>{ children ? children : label}</Text>
        </View>)
    }

    
    React.useEffect(() => {
        setContent(title ? getImg() : getText())
    }, [])

    
    return <>{content}</>
}

const style = (type?: {bread?: boolean, title?: boolean}, size?: number): IStyles => {
    
    return(
        StyleSheet.create({
            container: {
              width:"100%",

              border: '1px solid red',
              margin: type?.bread ? "" : 10
            },
            text: {
                fontFamily: type?.bread ? 'sans-serif' : 'FredokaOne_400Regular' ,
                fontSize: size || 20
            }
          })
    )
}

export default TicTacText
