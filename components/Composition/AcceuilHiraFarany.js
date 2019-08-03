import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import ListStyle from '../ReUseComponent/ListStyle'

// VUE POUR AFFICHER LES CHANTS RECENTS SUR NOTRE ACCEUIL

class AcceuilHiraFarany extends React.Component{

    constructor(props){
        super(props)
        this.navigation = this.props.vue
        this.titreHira = this.props.titreHira

        //bind function
        this.onClick = this.onClick.bind(this)
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
            <ListStyle onPress = {this.onClick}>
                <View style = {styles.container}>
                    <Text style={styles.titreHira}>{(this.titreHira)}</Text>
                    <Text style={styles.artiste}>{this.props.artiste}</Text>
                </View>
            </ListStyle>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        //backgroundColor : 'yellow',
        marginLeft : 10,
        marginTop : 2
    },  
    titreHira : {
        fontSize : 25,
        textAlign : 'left',
        color : '#707070',
        fontFamily : "Poppins-Regular"
    },
    artiste : {
        fontSize : 15,
        textAlign : 'left',
        color : '#D1D1D1',
        fontFamily : "Poppins-Light"
    }
})

export default AcceuilHiraFarany