import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, FlatList, ToastAndroid } from 'react-native'
import HiraArtisteWithImage from './Composition/HiraArtisteWithImage'
import { queryData, artisteCount } from '../Database/dbQuery'
import { PulseIndicator } from 'react-native-indicators'


//MAMPISEHO IREO ARTISTA REHETRA
export default class ListeArtiste extends Component {

    constructor(props){
        super(props)
        this.state = {
            load : true,
            data : []
        }
        this.dataDebut = 0
        this.dataFin = 0
        this.totalData = artisteCount()
       
    }

    loadData(d, f){
        this.dataDebut = d
        this.dataFin = f
        this.setState({
            data : [...this.state.data, ...queryData(d,f)],
        })
    }

    componentDidUpdate(){
        
    }

    disableLoading(){
       setTimeout(() => this.setState({load : false}), 7000)
    }
    /**
     * Fonction pour afficher un loading
     * Mbola tsy mandeha
     */
    loadingView(){
        if(this.state.load){
            return(
                <View  style = {styles.loading} opacity = {1}>    
                    <PulseIndicator color="#2B3E72" size = {100}/>
                    <Text style={styles.fanokafana}>Eo am-panokafana ny lisitra</Text>
                </View>
            )
        }
    }

    componentDidMount(){
        this.loadData(0,this.totalData)
    }
   
    render() {
       // ToastAndroid.show(this.dataFin.toString(),ToastAndroid.SHORT)
        return (
            <View style = {styles.container}  pointerEvents = {this.state.load ? 'none' : 'auto'}>
                <ScrollView opacity = {this.state.load ? 0.3 : 1.0}>
                    <FlatList 
                        data = {this.state.data}
                        keyExtractor = {(item) => item.id.toString()}
                        renderItem = {({item}) => <HiraArtisteWithImage 
                            image = {require('../images/Icon/cd.png')} 
                            artiste = {item.artiste}
                            idArtiste = {item.id}
                            navigation = {this.props.navigation}
                            />}
                    />
                </ScrollView>
                {this.disableLoading()}
                { this.loadingView() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#f0f4f5",
    },
    loading : {
        position : 'absolute',
        top : 0,
        left : 0,
        right : 0,
        bottom : 0,
        justifyContent : 'center',
        alignItems : 'center'
    }, 
    fanokafana : {
        fontSize : 20,
        color : "#2B3E72"
    }
    
})
