import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

const Bird = ({ birdBottom, birdLeft, birdHeight, birdWidth }) => {

    return (
        <Animated.View style={{
            position: 'absolute',
            backgroundColor: 'blue',
            width: birdWidth,
            height: birdHeight - (birdWidth/2),
            bottom: birdBottom
        }}>

        </Animated.View>
    );
}

export default Bird;