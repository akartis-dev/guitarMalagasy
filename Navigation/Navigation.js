import React from 'react'
import {Image, StyleSheet, Button } from 'react-native'
import {createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import Acceuil from '../components/Acceuil'
import Favorite from '../components/Favorite'
import ListeArtiste from '../components/ListeArtiste'
import HiraNote from '../components/HiraNote'
import HiraArtista from '../components/HiraArtista'
import HiraRehetra from '../components/HiraRehetra'


/**
 * Acceuil Navigation
 */
const createSearchNavigator = createStackNavigator({
    Acceuil : {
        screen : Acceuil,
        navigationOptions : {
            header : null,
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
            title : 'HIRA SAFIDINAO',
            header: null,
        }
    }, 
    HiraNote : {
        screen : HiraNote,
        
    }
})

/**
 * Favorite navigationOptions supplementaire
 * HIDE TABBAR IN NOTE VIEW
 * return true ou false pour la tabBar
 */
createFavoriteNavigator.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;

    //acceder a noter nom du vue sur notre navigation
    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'HiraNote' ) {
        tabBarVisible = false
    }
    return {
        tabBarVisible,
    }
}


/**
 * Liste chanson Navigation
 */
const createListNavigator = createStackNavigator({
    ListeArtiste : {
        screen : ListeArtiste,
        navigationOptions : {
            title : 'LISITRY NY ARTISTA',header: null,
        }
    }, 
    HiraArtista : {
        screen : HiraArtista,
        navigationOptions : ({navigation}) => {
            const titre = navigation.getParam('Artiste').toUpperCase()
            return(
            {
                header: null,  
            }     
            )
        }
    },
    HiraNote : {
        screen : HiraNote,
    }
})

/**
 * Favorite navigationOptions supplementaire
 * HIDE TABBAR IN NOTE VIEW
 * return true ou false pour la tabBar
 */
createListNavigator.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;

    //acceder a noter nom du vue sur notre navigation
    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'HiraNote' || routeName == 'HiraArtista' ) {
        tabBarVisible = false
    }
    return {
        tabBarVisible,
    }
}


/**
 * Hira rehetra vue
 */
const createHiraRehetraNavigator = createStackNavigator({
    HiraRehetra : {
        screen : HiraRehetra,
        navigationOptions : {
            title : 'LISITRY NY HIRA',header: null,
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
const createTabNav = createMaterialTopTabNavigator({

    Acceuil : {
        screen : createSearchNavigator, 
        navigationOptions : {
            tabBarIcon : () => {
                return (<Image source= {require('../images/Icon/Acceuil.png')}  style = {styles.image} />)
            }, 
            title : 'FARANY',
           
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
           title : 'Artista',
           
        }
    },

    HiraRehetra : {
        screen : createHiraRehetraNavigator,
        navigationOptions : {
            tabBarIcon : () => {
                return (<Image source= {require('../images/Icon/ic_search.png')}  style = {styles.image} />)
            }, 
           title : 'Lisitra',
           
        }
    }
},
{
    tabBarOptions : {
        showLabel : true,
        showIcon : false,
        style : {
            backgroundColor : '#302C2A'
        }, 
        labelStyle : {
            fontFamily : "Poppins-Regular"
        }
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