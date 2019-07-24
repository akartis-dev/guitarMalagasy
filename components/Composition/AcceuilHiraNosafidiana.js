import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

//ACCEUIL PERMET D'AFFICHER LES FAVORIES
class AcceuilHiraNosafidiana extends React.Component{

    constructor(props){
        super(props)
        this.nav = this.props.vue
    }

    //nous passe sur la vue de la chanson
    onClick(){
        this.nav.navigate("HiraNote", {idHira : this.props.idHira})
    }

    render(){
        return (
            <TouchableOpacity style = {styles.container} onPress = {() => this.onClick()} activeOpacity = {0.7}>
                <Image source = {require('../../images/Icon/cd.png')} style = {styles.image}/>
                <View style = {styles.textContainer}>
                    <Text style  = {styles.titre}>{this.props.titreHira}</Text>
                    <Text style  = {styles.artiste}>{this.props.mpihira}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row', 
        backgroundColor : 'white', 
        height : 50, margin: 5, marginBottom : 0,marginLeft : 0,
        borderColor : '#EBEEF7',
        borderWidth : 2,
        borderRadius : 10
    },

    image : {
        marginTop: 3,
        marginStart : 5,
        width: 40, 
        height:40, 
        resizeMode : 'cover'
    }, 
    titre : {
        fontSize : 20,
        fontWeight : '500',
        alignItems : 'center',
        color : '#3F5AA6'
    }, 
    artiste : {
        fontSize : 15,
        alignItems : 'center',
        color : '#828899'
    },
    textContainer : {
        //backgroundColor : 'yellow',
        justifyContent : 'center',
        marginLeft: 5
    }
})

export default AcceuilHiraNosafidiana