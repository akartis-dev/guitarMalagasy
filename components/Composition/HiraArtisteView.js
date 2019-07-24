import React, { Component } from 'react'
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

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
                <Image source = {require('../../images/Icon/play.png')} style = {styles.images}/>
                {this.renderFavoriteImage()}
                <Text style = {styles.titreHira}> {this.hira} </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        height : 40,
        margin : 5,
        marginTop : 5,
        marginBottom : 0,
        backgroundColor : 'white',
        borderWidth : 2,
        borderRadius : 10,
        borderColor : '#EBEEF7',
    }, 
    images : {
        width : 30,
        height : 30,
        margin : 5,
        marginTop : 3,
        resizeMode : 'center'
    },
    imagesFavorite : {
        width : 20,
        height : 20,
        marginTop: 3,
        resizeMode : 'center',
        justifyContent : 'center'
    },
    titreHira : {
        flex : 1,
        textAlign : 'center',
        fontSize : 30,
        color : '#3F5AA6'
    }
})
