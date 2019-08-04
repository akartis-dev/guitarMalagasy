import React from 'react'
import { StyleSheet, View, ScrollView, FlatList, StatusBar } from 'react-native'
import AcceuilHiraFarany from './Composition/AcceuilHiraFarany'
import StyleGlobal from './ReUseComponent/StyleGlobal'
import { connect } from 'react-redux'

class Acceuil extends React.Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBackgroundColor("#5077ad")
        })
    }

    componentWillUnmount(){
        this._navListener.remove()
    }
    
    render(){
        //console.warn(this.props.lastSong)
        return (
                <ScrollView
                   style = {{backgroundColor : "#e4e8ed"}}
                >
                    <StatusBar backgroundColor = "#5077ad" />
                    <View style = {StyleGlobal.containerMargin}>
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
     
})

const mapStateToProps = (state) => {
    // return state
    return {
        favoriteChant : state.favoriteReducer.favoriteChant,
        lastSong : state.lastSongReducer.lastSong
    }
}

export default connect(mapStateToProps)(Acceuil)