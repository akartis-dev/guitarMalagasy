import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, ScrollView,TextInput } from 'react-native'
import HiraRehetraComponent from './Composition/HiraRehetreComponent'
import { dbQueryAllSong } from '../Database/dbQuery'
import { PulseIndicator, SkypeIndicator } from 'react-native-indicators'
import { MaterialHeaderButtons, Item } from '../Navigation/Header'

class HeaderButton extends Component{
    render(){
        //console.warn(this.saveStore())
        return(
            <MaterialHeaderButtons
                onOverflowMenuPress={this._onOpenActionSheet}
            >
                <Item title="person" iconName="person" onPress={() => alert('person')} />
                <Item title="edit" show="never" onPress={() => alert('edit')} />
                <Item title="delete" show="never" onPress={() => alert('delete')} />
            </MaterialHeaderButtons>
        )
    }

    onOpenActionSheet = ({ hiddenButtons }) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    let options = hiddenButtons.map(it => it.props.title);
    let destructiveButtonIndex = 1;

    this.props.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
      },
      buttonIndex => {
        hiddenButtons[buttonIndex].props.onPress();
      }
    );
  };
}

export default class HiraRehetra extends Component {

    constructor(props){
        super(props)
        this.state = {
            load : true,
        }
        this.data = dbQueryAllSong()
    }

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

    // static navigationOptions = () => {
    //     return(
           
    //     )
    // } 

    disableLoad(){
        setTimeout(() => this.setState({load : false}), 10000)
    }

    filterTableau(text){
        this.setState({load : true})
        this.data = dbQueryAllSong().filter(element => element.titreHira.toLowerCase().includes(text.toLowerCase()))
        
    }

    render() {
        return (
            <View pointerEvents = {this.state.load ? 'none' : 'auto'} style={styles.container}>
                <View opacity = {this.state.load ? 0.3 : 1.0}>
                    <TextInput style = {styles.searchInput}
                        placeholder = "HIRA TADIAVINA"
                        onChangeText = {(t) => this.filterTableau(t)}
                     />
                </View>
                <ScrollView opacity = {this.state.load ? 0.3 : 1.0}>  
                    <FlatList
                        data = {this.data}
                        keyExtractor = {item => item.idHira.toString()}
                        extraData = {this.data}
                        renderItem = {({item}) =><HiraRehetraComponent
                            idHira = {item.idHira}
                            titreHira = {item.titreHira}
                            navigation = {this.props.navigation}
                        />}
                    />
                    
                    
                </ScrollView>
                {this.disableLoad()}
                {this.loadingView()}
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1, 
        backgroundColor : '#FAFBFF'
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
    searchInput : {
        margin : 5, 
        height : 35,
        borderColor : '#EBEEF7',
        borderWidth : 1,
        borderRadius : 5
    }

})
