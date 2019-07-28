import React, { Component } from 'react'
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class HiraArtisteView extends Component {

    constructor(props){
        super(props)
        this.hira = this.props.hira
        this.id = this.props.id
        this.artiste = this.props.artiste
        this.isFavorite = this.props.isFavorite
        
    }

    onClick(){
        this.props.navigation.navigate("HiraNote", {hira : this.hira, idHira: this.id, artiste:this.artiste})
    }

    renderFavoriteImage(){
        if(this.isFavorite(this.id)){
            return <Image source = {require('../../images/Icon/favoriteBlack.png')} style = {styles.imagesFavorite}/>
        }
    }

    
    render() {
        return (
            <TouchableOpacity style = {styles.container} onPress = {() => this.onClick()} activeOpacity = {0.7}>
                <Text style = {styles.titreHira}> {this.hira} </Text>
                {this.renderFavoriteImage()}
                <MaterialIcons name = 'keyboard-arrow-right' size = {45} color = "#707070" />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        height : 50,
        margin : 5,
        marginTop : 5,
        marginBottom : 0,
        backgroundColor : 'white',
        borderWidth : 2,
        borderRadius : 3,
        borderColor : 'white',
        justifyContent : 'center',
        alignItems : 'center'
    }, 
   
    imagesFavorite : {
        width : 20,
        height : 20,
        resizeMode : 'center',
        justifyContent : 'center'
    },
    titreHira : {
        flex : 1,
        fontSize : 25,
        color : '#707070',
        fontFamily : 'Poppins-Light'
    }
})
