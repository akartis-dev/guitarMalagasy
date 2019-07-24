import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import {dbQueryArtisteSong} from '../Database/dbQueryArtisteSong'
import { MaterialHeaderButtons, Item } from '../Navigation/Header'
import { connect } from 'react-redux'
import Store from '../Store/configureStore'
import { queryChantDetailWithId } from '../Database/dbQuery'

/**
 * Definir une class qui va gerer notre vue avec le changement de style
 * 
 */
class HeaderButton extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            state : null
        }
    }

    /**
     * Ajouter au favorie
     */
    addFavorite(){
        const action = {type : "toogleFavorite", value : HiraId}
        Store.dispatch(action)
        this.forceUpdate()
    }

    /*
     * recuperation de notre store
     */
    saveStore(){
        return state = Store.getState()
    }

    /**
     * verifie si notre chanson est deja dans la liste, si oui, on change la couleur du coeur
     */

     isFavorite(){
         if(SharedDataClass.favorie){
            return <Item title="Favorite" iconName="favorite" onPress={() => this.addFavorite() } />
         }else{
            return <Item title="Favorite" iconName="favorite-border" onPress={() => this.addFavorite() } />
         }
     }

     /**
      * Reduit la police
      */
     reduceFontSize(){
         const action = {type : "REDUCE_FONT", value : ''}
         Store.dispatch(action)
     }
     
    increaseFontSize(){
        const action = {type : "INCREASE_FONT", value : ''}
        Store.dispatch(action)
    }

    /**
     * Rendu de notre application
     */
    render(){
        //console.warn(this.saveStore())
        return(
            <MaterialHeaderButtons>
                <Item title="downFont" iconName="arrow-downward" onPress={() => this.reduceFontSize()} />
                <Item title="upFont" iconName="arrow-upward" onPress={() => this.increaseFontSize() } />
                {this.isFavorite()}
            </MaterialHeaderButtons>
        )
    }
}

/**
 * Object globale contenant les details du chansons a ajouter ou a supprimer de notre redux
 * Pour etre acceder sur notre Test
 */
let HiraId = {} 
let SharedDataClass = {}
let titre

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
        this.props.navigation.setParams({title : ((this.detail.titre).substring(0,10) + '...').toUpperCase()})
    }

    /**
     * affichage des icons pour notre navigation
     */
    static navigationOptions = ({navigation}) => {
        return(
            {
                title : navigation.state.params.title === undefined ? 'NAOTY' : navigation.state.params.title ,
                headerRight: <HeaderButton />
            }
        )
    }

    componentDidMount(){
        
        //console.warn(this.detail)
        HiraId = {id : this.idHira, hira : this.detail.titre, artiste : this.detail.artiste}
        // HiraId = {id : this.idHira, hira : this.hira, artiste : this.artiste}
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
     * Verifie si notre chanson qu'on vient d'ouvrir est dans la favorie ou non, 
     * Si oui, on return true
     * Si non, on return false 
     */

    checkFavorite(){
        const isFavorite = this.props.favoriteChant.findIndex(element => element.id === this.idHira )
        // isFavorite = -1
        if(isFavorite === -1){
            //on pas deja
            SharedDataClass = {favorie : false}
        }else{
            SharedDataClass = {favorie : true}
        }
    }

    /**
     * Methode rendu
     *  
     */
    render() {
        this.checkFavorite()
        return (
            <View style = {styles.container}>
                <ScrollView 
                	style = {styles.noteContainer}
                    showsVerticalScrollIndicator = {false}
                    >
                   <Text style = {{fontSize : this.props.fontSize}}> {dbQueryArtisteSong(this.idHira).default}</Text>
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
        flex: 1
    }, 
    noteContainer : {
    	margin : 10,
        marginTop : 3,
        marginBottom : 0
    },
    note : {
    	color : '#828899',
    	fontSize : 20
    }

})
