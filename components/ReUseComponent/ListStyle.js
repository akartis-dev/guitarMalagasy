import React, { Component } from 'react'
import {StyleSheet, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class ListStyle extends Component {

    constructor(props){
        super(props)
        this.onClick = this.props.onPress
    }

    render() {
        return (
            <TouchableOpacity style = {styles.container} onPress = {() => this.onClick()} activeOpacity = {0.7}>
               {this.props.children}
                <MaterialIcons name = 'keyboard-arrow-right' size = {45} color = "#707070"  style = {styles.icon}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        height : 60,
        margin : 5,
        marginTop : 5,
        marginBottom : 0,
        backgroundColor : 'white',
        borderWidth : 2,
        borderRadius : 3,
        borderColor : 'white',
        borderBottomColor : '#ebebeb'
    }, 
    icon : {
        position : 'absolute',
        top : 5,
       right : 0,
       //backgroundColor  : 'red',
    }

})

