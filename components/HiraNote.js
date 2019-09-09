import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Slider } from 'react-native'
import {dbQueryArtisteSong} from '../Database/dbQueryArtisteSong'
import { connect } from 'react-redux'
import { queryChantDetailWithId } from '../Database/dbQuery'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTML from 'react-native-render-html';
import { interpolate } from './function/fontSize'

/**
 * Rendu normal de notre application
 */

class HiraNote extends Component {
    
    /**
     * constructor
     */
    constructor(props){
        super(props)
        this.idHira = this.props.navigation.state.params.idHira
        this.detail = this.loadChantDetail()
        this.state = {
            defaultFont : 20,
        }
    }

    componentDidMount(){
        this.dispatchLastSong()
    }

    dispatchLastSong(){
        const action = {type : "LAST_SONG", value : {id : this.idHira, artiste : this.detail.artiste, titreHira : this.detail.titre}}
        this.props.dispatch(action)
    }

    /**
     * Load chant detail qu'on on a uniquement l'id 
     */
    loadChantDetail(){
        return queryChantDetailWithId(this.idHira)
    }

    /**
     * Ajouter ou supprimer des favories
     */
    addFavorite(){
        const action = {type : "toogleFavorite", value : {id : this.idHira, hira : this.detail.titre, artiste : this.detail.artiste}}
        this.props.dispatch(action)      
    }

    /**
     * Verifie si notre chanson qu'on vient d'ouvrir est dans la favorie ou non, 
     * Si oui, on return true
     * Si non, on return false 
     */

    checkFavorite(){
        const isFavorite = this.props.favoriteChant.findIndex(element => element.id === this.idHira )
        // isFavorite = -1
        if(isFavorite === -1){
            //on pas deja
            return(
                    <MaterialIcons name = 'favorite' size = {45} color = "#A8A8A8"/>
               
            )
        }else{
            return(
                    <MaterialIcons name = 'favorite' size = {45} color = "#DAA452"/>
                
            )
        }
    }

    /**
     * Bouton retour
     */
    returnButton(){
        this.props.navigation.goBack(null)
        return true
    }

    /**
     * Methode rendu
     */
    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.headBar}>
                        <Text style = {styles.titreHira}>{this.detail.titre}</Text>
                        <Text style = {styles.artiste}>{this.detail.artiste}</Text>
                        <TouchableOpacity  style = {styles.favorite} onPress = {() => this.addFavorite()} >
                            {this.checkFavorite()}
                        </TouchableOpacity>

                        <TouchableOpacity  style = {styles.returnButton} onPress = {() => this.returnButton()} >
                            <MaterialIcons name = 'keyboard-arrow-left' size = {45} color = "black" />
                        </TouchableOpacity>
                </View>
                <Slider
                    style={{height: 20, borderRadius : 10}}
                    minimumValue={-5}
                    maximumValue={5}
                    minimumTrackTintColor="#DAA452"
                    maximumTrackTintColor="#000000"
                    thumbTintColor = '#DAA452'
                    step = {1}
                    onValueChange = {(defaultFont) => {
                        console.warn(defaultFont)
                    }}
                />
                <ScrollView 
                	style = {styles.noteContainer}
                    showsVerticalScrollIndicator = {false}
                    >
                  
                   <HTML 
                        renderers = {
                        {
                            //utilisation du custom font pour modifier le contenu general de notre html
                            t : (htmlAttribs, children, convertedCSSStyles, passProps) => <Text 
                               >
                               {children}
                            </Text>,
                        }
                        }
                        baseFontStyle = {{fontFamily : 'Poppins-Light' }}
                        classesStyles = { {note : { color : '#DAA452', fontFamily : "Poppins-Regular"}, 
                        textSize : {fontSize : interpolate(this.state.defaultFont)}, 
                        refrain : {borderLeftWidth: 2, borderColor : '#D1D1D1', paddingLeft : 8, marginLeft:10},
                        tonony : {fontFamily : "Poppins-Regular", color : 'black'},
                        
                         }}
                        html = {dbQueryArtisteSong(this.idHira).default} 
                    />
                </ScrollView>
            </View>
        )
    }
}

/**
 * Connexion sur le redux
 */
const mapStateToProps = (state) => {
    return {
        favoriteChant : state.favoriteReducer.favoriteChant,
        fontSize : state.fontReducer.font,
    }
}

export default connect(mapStateToProps)(HiraNote)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor : '#F5F2F0'
    }, 
    noteContainer : {
    	margin : 10,
        marginTop : 3,
        marginBottom : 0
    },
    note : {
    	color : '#828899',
        fontSize : 20,
        fontFamily :  "Poppins-Regular"
    }, 
    headBar : {
        alignItems : 'center',
        height : 70,
        borderBottomWidth : 2,
        borderBottomColor :"#E8E8E8"
        
    }, 
    titreHira : {
        fontSize : 30,
        fontFamily : "Poppins-SemiBold"
    }, 
    artiste : {
        fontSize : 20,
        fontFamily : "Poppins-Medium"
    },
    favorite : {
        position : 'absolute',
        right : 10,
        top : 10
    },
    returnButton : {
        top : 10,
        left : 0,
        position : 'absolute'
    }

})
