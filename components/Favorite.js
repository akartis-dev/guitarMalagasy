import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, FlatList, StatusBar} from 'react-native'
import FavorieViewHira from './Composition/FavorieViewHira'
import StyleGlobal from './ReUseComponent/StyleGlobal'
import { connect } from 'react-redux'


class Favorite extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBackgroundColor("#3d377a")
        })
    }

    componentWillUnmount(){
        this._navListener.remove()
    }

    render() {
        return (
                <ScrollView style = {{backgroundColor : '#dddce3'}}>
                    <View style = {StyleGlobal.containerMargin}>   
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
                    </View>
                </ScrollView>
            
        )
    }
}




const styles = StyleSheet.create({
})

const mapStateToProps = (state) => {
    return {
        favoriteChant : state.favoriteReducer.favoriteChant
    }
}

export default connect(mapStateToProps)(Favorite)