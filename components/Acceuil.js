import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image, FlatList, Dimensions, Alert } from 'react-native'
import AcceuilHiraFarany from './Composition/AcceuilHiraFarany'
import AcceuilHiraNosafidiana from './Composition/AcceuilHiraNosafidiana'
import { connect } from 'react-redux'

class Acceuil extends React.Component{

    constructor(props){
        super(props)
    }
    
    render(){
        //console.warn(this.props.lastSong)
        return (
                <ScrollView
                   style = {{backgroundColor : "#F5F2F0"}}
                >
                    <View style = {styles.container}>
                        <FlatList 
                            data = {this.props.lastSong}
                            keyExtractor = {item => item.id.toString()}
                            renderItem = {({item}) =>  <AcceuilHiraFarany 
                                image={require('../images/Mpanakanto/icon.png')} 
                                id = {item.id}
                                artiste = {item.artiste}
                                titreHira = {item.titreHira} 
                                vue = {this.props.navigation}/> }
                            //contentContainerStyle = {{flexDirection : 'row'}}
                        />
                    </View>
                </ScrollView>     
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginLeft : 5,
        marginRight : 5
    }, 
    hiraFarany : {
        fontSize : 30,
        fontFamily : 'Poppins-SemiBold',
        color : '#3F5AA6'
    },  
})

const mapStateToProps = (state) => {
    // return state
    return {
        favoriteChant : state.favoriteReducer.favoriteChant,
        lastSong : state.lastSongReducer.lastSong
    }
}

export default connect(mapStateToProps)(Acceuil)