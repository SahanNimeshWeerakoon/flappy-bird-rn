import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Bird = ({ birdBottom, birdLeft, birdHeight, birdWidth }) => {

    return (
        <View style={{
            position: 'absolute',
            backgroundColor: 'blue',
            width: birdWidth,
            height: birdHeight - (birdWidth/2),
            bottom: birdBottom - (birdHeight/2)
        }}>

        </View>
    );
}

export default Bird;