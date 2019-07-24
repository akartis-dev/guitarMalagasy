import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class HiraRehetreComponent extends Component {

    constructor(props){
        super(props)
    }

    onClick() {
        this.props.navigation.navigate("HiraNote", {idHira : this.props.idHira})
    }

    render() {
        return (
            <TouchableOpacity style={styles.container}  onPress = {() => {}} activeOpacity = {0.7} onPress = {() => this.onClick()}>
                    <MaterialIcons name = 'library-music' size = {30} color = "#2B3E72" style = {styles.icon} />
                    <View style ={styles.textContainer}>
                        <Text style={styles.titre}>{this.props.titreHira}</Text>
                    </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        height : 40,
        backgroundColor : 'white',
        borderWidth : 2,
        borderRadius : 10,
        borderColor : '#EBEEF7',
        marginLeft : 5,
        marginRight : 5,
        marginTop : 2

    },
    titre : {
        flex : 1,
        color: '#3F5AA6',
        fontSize : 25,
        marginTop : 2
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
        marginTop : 2,
        marginLeft : 2,
    }
})
