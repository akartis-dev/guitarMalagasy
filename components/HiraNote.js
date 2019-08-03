import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import {dbQueryArtisteSong} from '../Database/dbQueryArtisteSong'
import { MaterialHeaderButtons, Item } from '../Navigation/Header'
import { connect } from 'react-redux'
import Store from '../Store/configureStore'
import { queryChantDetailWithId } from '../Database/dbQuery'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTML from 'react-native-render-html';

/**
 * Object globale contenant les details du chansons a ajouter ou a supprimer de notre redux
 * Pour etre acceder sur notre Test
 */
let HiraId = {} 
let SharedDataClass = {}

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
     *   <Text style = {[styles.note, {fontSize : this.props.fontSize}]}> {dbQueryArtisteSong(this.idHira).default}</Text>
     * renderers = {
                        {
                            //utilisation du custom font pour modifier le contenu general de notre html
                            t : (htmlAttribs, children, convertedCSSStyles, passProps) => <Text 
                                style = {{ fontSize : 15, color : '#DAA452'}}>
                                {children}
                            </Text>,
                        }
                        }

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
                <ScrollView 
                	style = {styles.noteContainer}
                    showsVerticalScrollIndicator = {false}
                    >
                  
                   <HTML 
                        renderers = {
                        {
                            //utilisation du custom font pour modifier le contenu general de notre html
                            t : (htmlAttribs, children, convertedCSSStyles, passProps) => <Text 
                                style = {{ fontSize : 17}}>
                               {children}
                            </Text>,
                        }
                        }
                        baseFontStyle = {{fontFamily : 'Poppins-Light' }}
                        classesStyles = { {note : { color : '#DAA452'}} }
                        html = {dbQueryArtisteSong(this.idHira).default} 
                    />
                </ScrollView>
            </View>
        )
    }
}

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
