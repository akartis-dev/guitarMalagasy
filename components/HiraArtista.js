import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, Animated, TouchableOpacity } from 'react-native'
import HiraArtisteView from './Composition/HiraArtisteView'
import { connect } from 'react-redux'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HEADER_MAX_HEIGHT = Dimensions.get('window').height / 3
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
        this.nb = this.props.navigation.state.params.Isa
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
     * initialNumToRender = {5}
        maxToRenderPerBatch = {10}
     */
    _listData(){
        return(
            <View style = {{marginTop : HEADER_MAX_HEIGHT}}>
                <OptimizedFlatList 
                    data = {this.listeHira}
                    extraData = {this.props.favoriteChant}
                    keyExtractor = {(item) => item.idHira.toString()}
                    renderItem = { this.renderItem }
                    />
            </View>
        )
    }

    /**
     * return button
     */
    returnButton(){
        return(
            <TouchableOpacity onPress = {() => {
                this.props.navigation.goBack(null)
                return true
                } }>
                 <MaterialIcons name = 'keyboard-arrow-left' size = {45} color = "black" />
            </TouchableOpacity>
        )
    }

    /**
     * RENDER
     */

    render() {

        /**
         * Animation de notre scroll, deplacement de notre header vers le haut
         */
        const scrollAnimated = this.state.scrollY.interpolate({
            inputRange : [0, HEADER_SCROLL],
            outputRange : [0, - (HEADER_SCROLL) ],
            extrapolate : 'clamp', 
            //useNativeDriver: true
        })

        /**
         * Mis en place du texte sur le head bar a la fin du scroll
         */
        const textAnimated = this.state.scrollY.interpolate({
            inputRange : [0, HEADER_SCROLL],
            outputRange : [0, (HEADER_SCROLL - HEADER_MAX_HEIGHT / 3) + 8],
            extrapolate : 'clamp', 
            
        })

        /**
         * Deplacement de l'image en fonction du scroll
         */
        const translate = this.state.scrollY.interpolate({
            inputRange : [0, HEADER_SCROLL],
            outputRange : [0, HEADER_MAX_HEIGHT],
            extrapolate : 'clamp',
            
        })

        /**
         * Opacite de l'image suivant le scroll
         */
        const opacity = this.state.scrollY.interpolate({
            inputRange : [0, HEADER_MAX_HEIGHT / 2],
            outputRange : [1,0],
            extrapolate : 'clamp',
            
        })

        /**
         * Opacite du texte suivant le scroll
         */
        const opacityTexte = this.state.scrollY.interpolate({
            inputRange : [0, HEADER_MAX_HEIGHT / 2],
            outputRange : [1,0],
            extrapolate : 'clamp',   
        })

        const centerText = this.state.scrollY.interpolate({
            inputRange : [0, HEADER_SCROLL],
            outputRange : [0, (Dimensions.get('window').width / 4) ],
            extrapolate : 'clamp',  
        })

        /**
         * pour le bouton retourn
         */
        const retournPosition = this.state.scrollY.interpolate({
            inputRange : [0, HEADER_SCROLL], 
            outputRange : [0, HEADER_SCROLL - 5],
            extrapolate : 'clamp'
        })

        return (
            <View style = {styles.container}>

                <Animated.ScrollView onScroll = {Animated.event( [{nativeEvent : {contentOffset : {y : this.state.scrollY }}}], 
                     {useNativeDriver: true})}    
                >
                    {this._listData()}
                </Animated.ScrollView>

                <Animated.View style = {[styles.header , {transform : [{translateY : scrollAnimated}]}]}>

                    <Animated.View style = {[styles.bar]}>

                        <Animated.Text style = {[styles.artiste, 
                            {transform : [{translateY : textAnimated}, {translateX : centerText}]}, 
                            ]} >
                            {this.artiste.toUpperCase()}
                        </Animated.Text>

                        <Animated.Text style = {[styles.nbHira, {opacity : opacityTexte}]}>Hira {this.nb}</Animated.Text>

                    </Animated.View>

                    <Animated.Image 
                        style = {[ styles.imageArtiste, {opacity : opacity, transform : [{translateY : translate}] } ]}
                        source = {require('../images/Mpanakanto/alainfarakely.jpg')}
                    />

                    <Animated.View style = {[styles.retourButton, {transform : [{translateY : retournPosition}]}]}>
                        {this.returnButton()}
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
        backgroundColor : '#F5F2F0'
    }, 
    header : {
        position: 'absolute',
        top : 0,
        left : 0,
        right : 0,
        overflow : 'hidden',
        borderBottomWidth : 2,
        borderBottomColor : '#F5F2F0'
    }, 
    imageArtiste : {
        position : 'absolute',
        height : 75,
        width : 75,
        resizeMode : 'cover',
        borderRadius : 75,
        right : 25,
        top : HEADER_MAX_HEIGHT / 3,
        
    }, 
    bar : {
        height : HEADER_MAX_HEIGHT,
        backgroundColor : '#F5F2F0',
    },
    artiste : {
        fontSize : 30,
        fontFamily : "Poppins-SemiBold",
        color : 'black',
        marginLeft : 20,
        marginTop : HEADER_MAX_HEIGHT / 3
    },
    nbHira : {
        fontSize : 20,
        fontFamily : "Poppins-Light",
        marginLeft : 20,
    }, 
    retourButton : {
        position : 'absolute',
        top : 10,

    }

})
