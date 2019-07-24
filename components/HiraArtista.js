import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, FlatList, View } from 'react-native'
import HiraArtisteView from './Composition/HiraArtisteView'
import { connect } from 'react-redux'

class HiraArtista extends Component {
    constructor(props){
        super(props)
        this.listeHira = this.props.navigation.state.params.hira
        this.artiste = this.props.navigation.state.params.Artiste
        this.state = {
            reload : null
        }
    }

    componentDidUpdate(){
        
    }

    /**
     * Verification de chacun des elements si c'est en favorie ou pas
     */

    isFavorite = (id) => {
        const favorite = this.props.favoriteChant.findIndex(element => element.id === id)
        if(favorite !== -1){
            return true
        }else{
            return false
        }
    }

    render() {
        return (
            <View style = {styles.container}>
                <ScrollView >
                    <FlatList 
                        data = {this.listeHira}
                        extraData = {this.props.favoriteChant}
                        keyExtractor = {(item) => item.idHira.toString()}
                        renderItem = {({item}) => <HiraArtisteView 
                            id = {item.idHira} //id anle hira
                            artiste = {this.artiste} //nom artiste mihira an'ilay hira
                            hira = {item.titreHira} //titre hira
                            navigation = {this.props.navigation}
                            isFavorite = {this.isFavorite}
                            /> }
                        
                    />   
                </ScrollView>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    // return state
    return {
        favoriteChant : state.favoriteReducer.favoriteChant
    }
} 
export default connect(mapStateToProps)(HiraArtista)

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#FAFBFF'
    }

})
