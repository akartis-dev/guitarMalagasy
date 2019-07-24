import React, { Component } from 'react'
import { StyleSheet,Text, View, ScrollView, Image, FlatList } from 'react-native'
import FavorieViewHira from './Composition/FavorieViewHira'
import { connect } from 'react-redux'


class Favorite extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style = {styles.container}>   
                <ScrollView style = {styles.listContainer}>
                    <FlatList 
                        data = {this.props.favoriteChant}
                        keyExtractor = {item => item.id.toString()}
                        renderItem = {({item}) => <FavorieViewHira
                                sary = {require('../images/Icon/favoriteBlack.png')}
                                mpihira = {item.artiste}
                                titre = {item.hira}
                                id = {item.id}
                                vue = {this.props.navigation}
                            />
                        }

                    />
                </ScrollView>
            </View>
            
        )
    }
}




const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#FAFBFF'
    },
    textTitre : {
        fontSize : 30,
        color : '#3F5AA6',
        fontWeight : '900',
        marginLeft : 5,
        marginRight : 5
    }, 
    listContainer : {
        marginTop : 5
    }
})

const mapStateToProps = (state) => {
    return {
        favoriteChant : state.favoriteReducer.favoriteChant
    }
}

export default connect(mapStateToProps)(Favorite)