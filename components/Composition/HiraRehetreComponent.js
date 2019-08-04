import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import StyleGlobal from '../ReUseComponent/StyleGlobal'
import ListStyle from '../ReUseComponent/ListStyle'

export default class HiraRehetreComponent extends Component {

    constructor(props){
        super(props)
        this.onClick = this.onClick.bind(this)
        this.artiste = this.props.artiste
        
    }

    onClick() {
        this.props.navigation.navigate("HiraNote", {idHira : this.props.idHira})
    }
//<Text style={StyleGlobal.artiste}>{this.artiste.artiste}</Text>
    render() {
        return (
            <ListStyle onPress = { this.onClick }>
                <View style = {StyleGlobal.textContainer}> 
                    <Text style={StyleGlobal.titreHira}>{this.props.titreHira}</Text>
                    <Text style={StyleGlobal.artiste}>{this.artiste.artiste}</Text>
                </View>
            </ListStyle>
        )
    }
}

const styles = StyleSheet.create({
    
    titre : {
        flex : 1,
        color: '#3F5AA6',
        fontSize : 25,
        marginTop : 2
    },

})
