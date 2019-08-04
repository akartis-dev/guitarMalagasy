import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { dbQueryArtisteChant } from '../../Database/dbQuery'
import ListStyle from '../ReUseComponent/ListStyle'
import StyleGlobal from '../ReUseComponent/StyleGlobal'

//FAMPISEHOANA IREO ARTISTA MIARAKA AMIN"NY SARY
export default class HiraArtisteWithImage extends Component {

    constructor(props){
        super(props)
        this.id = this.props.idArtiste
        this.nb = dbQueryArtisteChant(this.id).length

        //bind function
        this.onClick = this.onClick.bind(this)
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
     * Render application
     */
    render() {
        return (
            <ListStyle onPress = {this.onClick}>
                <View style = {StyleGlobal.textContainer}>
                    <Text style = {StyleGlobal.titreHira}>{(this.props.artiste).toString().substring(0,25)}</Text>
                    <Text style = {StyleGlobal.artiste}>Isan'ny hira : {this.nb}</Text>
                </View>
            </ListStyle>
        )
    }
}

const styles = StyleSheet.create({
})
