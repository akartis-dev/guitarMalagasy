import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//PERMET DE FAIRE LES AFFICHAGES DES CHANTS DANS NOTRE FAVORIE AVEC UN ELEMENT

export default class FavorieViewHira extends Component {

    constructor(props){
        super(props)
        this.nav = this.props.vue
    }

    onClick(){
        this.nav.navigate("HiraNote", {idHira : this.props.id, artiste : this.props.mpihira, hira : this.props.titre })
    }

    /**
     * On attendan l'iamge
     *  <Image source = {this.props.sary} style = {styles.image} />
     */
    render() {
        return (
            <TouchableOpacity style={styles.container}  onPress = {() => this.onClick()} activeOpacity = {0.7}>
                <MaterialIcons name = 'headset' size = {50} color = "#2B3E72" style = {styles.icon} />
                <View style ={styles.textContainer}>
                    <Text style={styles.titre}>{this.props.titre}</Text>
                    <Text style={styles.artiste}>{this.props.mpihira}</Text>
                </View>
            </TouchableOpacity>
           
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        height : 60,
        backgroundColor : 'white',
        borderWidth : 2,
        borderRadius : 10,
        borderColor : '#EBEEF7',
        marginLeft : 5,
        marginRight : 5

    },

    image : {
        marginTop : 3,
        marginLeft : 5,
        width : 50, 
        height : 50, 
        resizeMode : 'cover',
        borderRadius : 30
    },

    titre : {
        color: '#3F5AA6',
        fontSize : 25
    },

    artiste : {
        color: '#828899',
        fontSize : 20
    }, 
    textContainer :{
        flex : 1,
        alignItems : 'center',
    }, 
    icon : {
        marginTop : 3
    }

})
