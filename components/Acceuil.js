import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image, FlatList, Dimensions, Alert } from 'react-native'
import AcceuilHiraFarany from './Composition/AcceuilHiraFarany'
import AcceuilHiraNosafidiana from './Composition/AcceuilHiraNosafidiana'
import HeaderButtonTempl from './ReUseComponent/HeaderButtonTempl'
import { Item, HiddenItem } from 'react-navigation-header-buttons';
import { connect } from 'react-redux'

class Acceuil extends React.Component{

    constructor(props){
        super(props)
    }

    static navigationOptions = () => {
        return({
            headerRight : (
                <HeaderButtonTempl>
                    <Item title="Momba ny application" show="never" onPress={() => Alert.alert('Momba ny Application', `
Izy ity dia application vita malagasy, fanatsarana ny Glita Malagasy efa nisy.
Ny base de donnee dia nalaina tamin'io ka nanampiana hira maro sady mbola hitombo foana.
Isaorana Andriamanitra nanome fotoana sy fahalalana,
Isaorana ny alalana azo nahafahana nanatontosa azy,
Isaorana manokana ny "GLITA MALAGASY" sy "ACOUSTIC GASY" tamin'ireo hira
Isaorana ny nandray anjara rehetra
                    `)} />
                </HeaderButtonTempl>
            )
        })
    }

    

    /**
     * render
     *  <AcceuilHiraFarany image={require('../images/Mpanakanto/icon.png')} artiste = "Lola" vue = {this.props.navigation} 
     * <Text style = {styles.tongasoa}>TONGASOA ETO AMIN'NY APPLICATION GLITA MALAGASY</Text>
        <Text style = {styles.tongasoasous}>Ahitanao naoty maro an'ireo artista malagasy. Mankasitraka anao mampiasa ny vita malagasy</Text>s
     */
    render(){
        //console.warn(this.props.lastSong)
        return (
            <View style = {styles.container}>
                <View style = {{marginLeft: -5, marginTop : 2 }}>
                    <Image source={require('../images/guitar.jpg')} style = {{width : (Dimensions.get('window').width), height : 160, borderRadius : 0}}/>
                </View>

                <View style = {styles.historicContainer}>
                    <Text style = {styles.hiraFarany}>Ireo hira farany:</Text>
                    <ScrollView
                        horizontal = {true}
                        vertical = {false}
                        showsHorizontalScrollIndicator = {false}
                        showsVerticalScrollIndicator = {false}
                    >

                        <FlatList 
                            data = {this.props.lastSong}
                            keyExtractor = {item => item.id.toString()}
                            renderItem = {({item}) =>  <AcceuilHiraFarany 
                                image={require('../images/Mpanakanto/icon.png')} 
                                id = {item.id}
                                artiste = {item.artiste}
                                titreHira = {item.titreHira} 
                                vue = {this.props.navigation}/> }
                            contentContainerStyle = {{flexDirection : 'row'}}
                        />

                    </ScrollView>
                </View>

                <View style = {styles.favoriteContainer}>
                    <Text style = {[styles.hiraFarany]}>Ireo hira nosafidinao</Text>
                    <ScrollView showsVerticalScrollIndicator = {false}>
                        <FlatList 
                            data = {this.props.favoriteChant.slice(0,10)}
                            keyExtractor = {(item) => item.id.toString()}
                            renderItem = {({item}) =>  <AcceuilHiraNosafidiana 
                                idHira = {item.id}
                                titreHira = {item.hira}
                                mpihira = {item.artiste}
                                vue = {this.props.navigation}/>}
                        />
                    </ScrollView>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#FAFBFF',
        marginLeft : 5,
    }, 
    hiraFarany : {
        fontSize : 30,
        fontFamily : 'Poppins-SemiBold',
        color : '#3F5AA6'
    }, 
    historicContainer : {
        //backgroundColor : 'yellow',
        height : 160
    },
    favoriteContainer : {
        flex : 2
    }, 
    tongasoa : {
        fontSize : 30,
        textAlign : "center",
        color : '#3F5AA6',
        fontWeight : '700'
    }, 
    tongasoasous : {
        fontSize : 20,
        textAlign : "left",
        color : '#828899',
        fontWeight : '100'
    }, 
    imgAcceuil : {
        
    }
})

const mapStateToProps = (state) => {
    // return state
    return {
        favoriteChant : state.favoriteReducer.favoriteChant,
        lastSong : state.lastSongReducer.lastSong
    }
}

export default connect(mapStateToProps)(Acceuil)