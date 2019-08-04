import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import ListStyle from '../ReUseComponent/ListStyle'
import StyleGlobal from '../ReUseComponent/StyleGlobal'
//PERMET DE FAIRE LES AFFICHAGES DES CHANTS DANS NOTRE FAVORIE AVEC UN ELEMENT

export default class FavorieViewHira extends Component {

    constructor(props){
        super(props)
        this.nav = this.props.vue

        //bind function
        this.onClick = this.onClick.bind(this)
    }

    onClick(){
        this.nav.navigate("HiraNote", {idHira : this.props.id, artiste : this.props.mpihira, hira : this.props.titre })
    }

    /**
     * Render Method
     *  
     */
    render() {
        return (
            <ListStyle onPress = {this.onClick}>
                <View style ={styles.textContainer}>
                    <Text style={StyleGlobal.titreHira}>{this.props.titre}</Text>
                    <Text style={StyleGlobal.artiste}>{this.props.mpihira}</Text>
                </View>
            </ListStyle>
           
        )
    }
}

const styles = StyleSheet.create({
    textContainer :{
        flex : 1,
        marginLeft : 10,
        marginTop : 2
    },
})
