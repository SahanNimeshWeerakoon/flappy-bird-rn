import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

export default function App() {
  
  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const birdWidth = 50;
  const birdHeight = 60;
  const gap = 100;

  const { width, height } = Dimensions.get('screen');
  const [ birdBottom, setBirdBottom ] = useState(height/2);
  const [ obstaclesLeft, setObstaclesLeft ] = useState(width);
  const [ obstaclesLeftTwo, setObstaclesLeftTwo ] = useState(width + width/2 + obstacleWidth/2);
  const [ obstaclesNegHeight, setObstaclesNegHeight ] = useState(0);
  const [ obstaclesNegHeightTwo, setObstaclesNegHeightTwo ] = useState(0);
  const [ score, setScore ] = useState(0);
  
  const birdLeft = width / 2;
  const gravity = 3;
  
  let birdTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;

  const [ isGameOver, setIsGameOver ] = useState(false);

  // make bird fall
  useEffect(() => {
    if(birdBottom > 0) {
      birdTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity);
      }, 30);

      return () => {
        clearInterval(birdTimerId);
      }
    }
  }, [birdBottom]);

  // start first obstacles
  useEffect(() => {
    if(obstaclesLeft > (-obstacleWidth)) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5);
      }, 30);

      return () => {
        clearInterval(obstaclesTimerId);
      }
    } else {
      setObstaclesLeft(width);
      setObstaclesNegHeight( - Math.random() * 100 );
      setScore(score => score+1);
    }
  }, [obstaclesLeft])

  // start second obstacles
  useEffect(() => {
    if(obstaclesLeftTwo > (-obstacleWidth)) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5);
      }, 30);

      return () => {
        clearInterval(obstaclesTimerIdTwo);
      }
    } else {
      setObstaclesLeftTwo(width);
      setObstaclesNegHeightTwo( - Math.random() * 100 );
      setScore(score => score+1);
    }
  }, [obstaclesLeftTwo])

  // check for collitions
  useEffect(() => {
    if(
      ( (birdWidth/2+birdLeft) > obstaclesLeft && (birdWidth/2+birdLeft) < obstaclesLeft+obstacleWidth ) && ( (birdHeight/2+birdBottom) < obstaclesNegHeight+obstacleHeight || (birdHeight/2+birdBottom) > obstaclesNegHeight+obstacleHeight+gap ) ||
      ( (birdWidth/2+birdLeft) > obstaclesLeftTwo && (birdWidth/2+birdLeft) < obstaclesLeftTwo+obstacleWidth ) && ( (birdHeight/2+birdBottom) < obstaclesNegHeightTwo+obstacleHeight || (birdHeight/2+birdBottom) > obstaclesNegHeightTwo+obstacleHeight+gap )
    ) {
      gameOver();
      console.log(score);
    }
  });

  const gameOver = () => {
    clearInterval(birdTimerId);
    clearInterval(obstaclesTimerId);
    clearInterval(obstaclesTimerIdTwo);
    setIsGameOver(true);
  }

  // make bird jump
  const jump = () => {
    if( !isGameOver && (birdBottom < height) ) {
      setBirdBottom(birdBottom => birdBottom + 50);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Bird birdBottom={birdBottom} birdLeft={birdLeft} birdWidth={birdWidth} birdHeight={birdHeight} />
        <Obstacles
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          obstaclesLeft={obstaclesLeft}
          randomBottom={obstaclesNegHeight}
          gap={gap}
          color={'red'}
        />
        <Obstacles
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          obstaclesLeft={obstaclesLeftTwo}
          randomBottom={obstaclesNegHeightTwo}
          gap={gap}
          color={'green'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
});
