import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import { dbQueryArtisteChant } from '../../Database/dbQuery'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//FAMPISEHOANA IREO ARTISTA MIARAKA AMIN"NY SARY
export default class HiraArtisteWithImage extends Component {

    constructor(props){
        super(props)
        this.id = this.props.idArtiste
        this.nb = dbQueryArtisteChant(this.id).length
    }

    /**
     * permet de changer de vue lorsque on appuie sur les elemets de notre liste
     * hira : donnee envoyer recupere depuis notre base de donnee pour les listes des chansons de notre artiste
     * artiste: donnee utiliser pour afficher le nom de l'artiste sur le head Bar, en relation avec notre navigation
     <Text style = {styles.nbHira}>Isan'ny hira : {dbQueryArtisteChant(this.id).length}</Text>
     */
    onClick(){
        this.props.navigation.navigate("HiraArtista", {hira : dbQueryArtisteChant(this.id), Artiste : this.props.artiste, Isa : this.nb })  
    }
         
    /**
     * On va juste remplacer notre icon pour l'instant le temps de recuperer tous les images des artiste
     *  <Image source = {this.props.image} style = {styles.image} />
     */
    render() {
        return (
            <TouchableOpacity style = {styles.container} onPress = {() => this.onClick()} activeOpacity = {0.7}>
                <MaterialIcons name = 'group' size = {60} color = "#2B3E72" />
                <View style = {styles.content}>
                    <Text style = {styles.artiste}>{this.props.artiste}</Text>
                    <Text style = {styles.nbHira}>Isan'ny hira : {this.nb}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        height : 60, 
        backgroundColor : 'white',
        marginLeft : 5,
        marginRight : 5,
        marginTop : 2,
        flexDirection : 'row',
        borderRadius : 10,
        borderWidth : 2,
        borderColor : '#EBEEF7'
        
    }, 
    image : {
        margin : 5,
        width : 120,
        height : 110,
        resizeMode : 'cover',
        borderRadius : 10
    }, 
    content : {
        marginLeft:5,
        flex : 1,
        justifyContent : 'center'
    }, 
    artiste : {
        fontSize : 25,
        color : '#3F5AA6'
    }, 
    nbHira : {
        color : '#828899',
        fontSize : 15
    }
})
