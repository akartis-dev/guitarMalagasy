import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, FlatList, View, Dimensions, Animated } from 'react-native'
import HiraArtisteView from './Composition/HiraArtisteView'
import { connect } from 'react-redux'

const HEADER_MAX_HEIGHT = Math.round(Dimensions.get("window").height / 3)
const HEADER_MIN_HEIGHT = 50
const HEADER_SCROLL = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class HiraArtista extends Component {

    constructor(props){
        super(props)
        this.listeHira = this.props.navigation.state.params.hira
        this.artiste = this.props.navigation.state.params.Artiste
        this.state = {
            reload : null,
            scrollY : new Animated.Value(0)
        }
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

    /**
     * FlatList renderItem
     */
    renderItem = ({item}) => <HiraArtisteView 
    id = {item.idHira} //id anle hira
    artiste = {this.artiste} //nom artiste mihira an'ilay hira
    hira = {item.titreHira} //titre hira
    navigation = {this.props.navigation}
    isFavorite = {this.isFavorite}
    />

    /**
     * Flatlist pour le rendu
     */
    _listData(){
        return(
            <View style = {{marginTop : HEADER_MAX_HEIGHT}}>
                <FlatList 
                    data = {this.listeHira}
                    extraData = {this.props.favoriteChant}
                    keyExtractor = {(item) => item.idHira.toString()}
                    renderItem = { this.renderItem }
                    initialNumToRender = {5}
                    maxToRenderPerBatch = {10}
                    />
            </View>
        )
    }

    /**
     * RENDER
     */

    render() {

        const scrollAnimated = this.state.scrollY.interpolate({
            inputRange : [0, HEADER_SCROLL],
            outputRange : [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate : 'clamp'
        })

        const translate = this.state.scrollY.interpolate({
            inputRange : [0, HEADER_SCROLL],
            outputRange : [0, -50],
            extrapolate : 'clamp'
        })

        const opacity = this.state.scrollY.interpolate({
            inputRange : [0, HEADER_MAX_HEIGHT / 2, HEADER_MAX_HEIGHT],
            outputRange : [1,1,0],
            extrapolate : 'clamp'
        })

        const opacityTexte = this.state.scrollY.interpolate({
            inputRange : [0, HEADER_MAX_HEIGHT / 2, HEADER_MAX_HEIGHT],
            outputRange : [0,0,1],
            extrapolate : 'clamp'
        })

        /**
         * 
         */

        return (
            <View style = {styles.container}>

                <ScrollView onScroll = {Animated.event( [{nativeEvent : {contentOffset : {y : this.state.scrollY}}}] )}>
                    {this._listData()}
                </ScrollView>

                <Animated.View style = {[styles.header, {height : scrollAnimated }]}>
                    <Animated.Image 
                            style = {[ styles.imageArtiste, {opacity : opacity,transform : [{translateY : translate}]} ]}
                            source = {require('../images/Mpanakanto/alainfarakely.jpg')}
                        />
                     <Animated.View style = {[styles.bar, {opacity : opacityTexte}]}>
                        <Text style = {styles.artiste}>{this.artiste.toUpperCase()}</Text>
                    </Animated.View>
                </Animated.View>
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
    }, 
    header : {
        position : 'absolute',
        top : 0,
        left : 0,
        right : 0,
        backgroundColor : 'white',
        overflow : 'hidden',
        
    }, 
    imageArtiste : {
        position : 'absolute',
        height : HEADER_MAX_HEIGHT,
        width : null,
        resizeMode : 'cover',
        top : 0,
        left : 0,
        right : 0
    }, 
    bar : {
        height : HEADER_MAX_HEIGHT,
        alignItems : 'center'
    },
    artiste : {
        fontSize : 30,
        fontWeight :  '700',
        color : 'black',
        marginTop : 10
    }

})
