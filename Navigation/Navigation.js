import React from 'react'
import {Image, StyleSheet, Button } from 'react-native'
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation'
import Acceuil from '../components/Acceuil'
import Favorite from '../components/Favorite'
import ListeArtiste from '../components/ListeArtiste'
import HiraNote from '../components/HiraNote'
import HiraArtista from '../components/HiraArtista'
import HiraRehetra from '../components/HiraRehetra'

// //header button
import { MaterialHeaderButtons, Item } from './Header'


/**
 * Acceuil Navigation
 */
const createSearchNavigator = createStackNavigator({
    Acceuil : {
        screen : Acceuil,
        navigationOptions : ({navigation}) =>{
            return({
                title : "GLITA MALAGASY",
            })
        }
    }, 
    HiraNote : {
        screen : HiraNote,
    }
})

/**
 * Favorite Navigation
 */

const createFavoriteNavigator = createStackNavigator({
    Favorite : {
        screen : Favorite,
        navigationOptions : {
            title : 'HIRA SAFIDINAO'
        }
    }, 
    HiraNote : {
        screen : HiraNote,
        
    }
})

/**
 * Liste chanson Navigation
 */

const createListNavigator = createStackNavigator({
    ListeArtiste : {
        screen : ListeArtiste,
        navigationOptions : {
            title : 'LISITRY NY ARTISTA'
        }
    }, 
    HiraArtista : {
        screen : HiraArtista,
        navigationOptions : ({navigation}) => {
            const titre = navigation.getParam('Artiste').toUpperCase()
            return(
            {
                header: null,
                //title : titre 
            }     
            )
        }
    },
    HiraNote : {
        screen : HiraNote,
        // navigationOptions : ({navigation}) => {
        //     const titre = navigation.getParam('hira').toUpperCase()
        //     return ({
        //         title : titre.substring(0,14) + "...",
        //     })
        // }
    }

})

/**
 * Hira rehetra vue
 */
const createHiraRehetraNavigator = createStackNavigator({
    HiraRehetra : {
        screen : HiraRehetra,
        navigationOptions : {
            title : 'LISITRY NY HIRA'
        }
    }, 
    HiraNote : {
        screen : HiraNote,
        // navigationOptions : {
        //     title : "HIRA MALAGASY"
        // }
    }
})

/*
    TAB NAVIGATOR
*/
const createTabNav = createBottomTabNavigator({

    Acceuil : {
        screen : createSearchNavigator, 
        navigationOptions : {
            tabBarIcon : () => {
                return (<Image source= {require('../images/Icon/Acceuil.png')}  style = {styles.image} />)
            }, 
            title : 'Tongasoa'
        }
    },

    Favorite : {
        screen : createFavoriteNavigator,
        navigationOptions : {
            tabBarIcon : () => {
                return (<Image source= {require('../images/Icon/favorite.png')}  style = {styles.image} />)
            }, 
           title : 'Safidy'
        }
    },

    ListeArtiste : {
        screen : createListNavigator,
        navigationOptions : {
            tabBarIcon : () => {
                return (<Image source= {require('../images/Icon/list.png')}  style = {styles.image} />)
            }, 
           title : 'Lisitra'
        }
    },

    HiraRehetra : {
        screen : createHiraRehetraNavigator,
        navigationOptions : {
            tabBarIcon : () => {
                return (<Image source= {require('../images/Icon/ic_search.png')}  style = {styles.image} />)
            }, 
           title : 'Lisitra'
        }
    }
},
{
    tabBarOptions : {
        showLabel : false,
        showIcon : true,
        activeBackgroundColor : '#2B3E72' ,
        inactiveBackgroundColor : '#3F5AA6'
    }
}
)

const styles = StyleSheet.create({
    image : {
        width : 20,
        height : 20,
        resizeMode : 'center'
    }
})

export default createAppContainer(createTabNav)