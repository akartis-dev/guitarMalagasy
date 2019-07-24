import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

// VUE POUR AFFICHER LES CHANTS RECENTS SUR NOTRE ACCEUIL

class AcceuilHiraFarany extends React.Component{

    constructor(props){
        super(props)
        this.navigation = this.props.vue
        this.titreHira = this.props.titreHira
    }

    titreHiraSub(a,b){
        let hira = this.titreHira
        return hira.substring(a,b)
    }

    //Permet de changer de vue directements
    onClick(){
        this.navigation.navigate("HiraNote", {hira : this.hira, idHira : this.props.id})
    }

    render(){
        return(
            <TouchableOpacity  style = {styles.imageHira} onPress = {() => this.onClick()} activeOpacity = {0.7}>
                <Image source = {this.props.image}   
                    style = {styles.sary}    
                 />
                <Text style={styles.titreHira}>{(this.titreHira)}</Text>
                <Text style={styles.artiste}>{this.props.artiste}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    imageHira : {
        flex : 1,
        marginLeft : 5,
        marginRight : 5
    },
    sary : {
        width : 100,     
        height : 90,
        resizeMode : 'center',
        borderRadius : 120,
    }, 
    titreHira : {
        flex : 1,
        fontSize : 20,
        textAlign : 'center',
        color : '#828899'
    },
    artiste : {
        fontSize : 15,
        textAlign : 'center',
        color : '#828899'
    }
})

export default AcceuilHiraFarany