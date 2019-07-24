import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
    HeaderButtons,
    HeaderButton,
    defaultOnOverflowMenuPress,
  } from 'react-navigation-header-buttons';

  const MaterialHeaderButton = props => (
    <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="blue" />
  );

export default class HeaderButtonTempl extends Component {
    render() {
        return (
            <HeaderButtons
                HeaderButtonComponent = {MaterialHeaderButton}
                OverflowIcon={<MaterialIcons name="more-vert" size={23} color="black" />}
                onOverflowMenuPress={({ overflowButtonRef, hiddenButtons }) =>
                defaultOnOverflowMenuPress({
                    overflowButtonRef,
                    hiddenButtons,
                    cancelButtonLabel: 'Anuuler lets a',
                })
                }
            >
                {this.props.children}
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({})
