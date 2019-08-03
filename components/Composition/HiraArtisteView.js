import React, { Component } from 'react'
import { Text, StyleSheet, Image,  } from 'react-native'

import ListStyle from '../ReUseComponent/ListStyle'
export default class HiraArtisteView extends Component {

    constructor(props){
        super(props)
        this.hira = this.props.hira
        this.id = this.props.id
        this.artiste = this.props.artiste
        this.isFavorite = this.props.isFavorite

        //bind function
        this.onClick = this.onClick.bind(this)
    }

    onClick(){
        this.props.navigation.navigate("HiraNote", {hira : this.hira, idHira: this.id, artiste:this.artiste})
    }

    renderFavoriteImage(){
        if(this.isFavorite(this.id)){
            return <Image source = {require('../../images/Icon/favoriteBlack.png')} style = {styles.imagesFavorite} />
        }
    }

    
    render() {
        return (
            <ListStyle onPress = {this.onClick}>
                <Text style = {styles.titreHira}> {this.hira} </Text>
                {this.renderFavoriteImage()}
            </ListStyle>
        )
    }
}

const styles = StyleSheet.create({
   
    imagesFavorite : {
        position : 'absolute',
        right : 50,
        top : 15,
        width : 25,
        height : 25,
        resizeMode : 'center',
        opacity : 0.6
    },
    titreHira : {
        flex : 1,
        fontSize : 25,
        color : '#707070',
        fontFamily : 'Poppins-Light',
        marginTop : 15
    }
})
