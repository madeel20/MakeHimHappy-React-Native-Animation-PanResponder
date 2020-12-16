import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import Men from './Components/Men';
import Heart from './Components/Heart';

const App = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const pan = useRef(new Animated.ValueXY()).current;
  const [frames, setFrame] = useState(0);
  const [showFinishButton, setFinishButton] = useState(false);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      // onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        listener: (_, gesture) =>
          setFrame((prevValue) => {
            if (prevValue >= 0.6) {
              alert('Great Work!');
              setFinishButton(true);
              pan.setOffset({x: 0, y: 0});
            }
            return 0.002 + prevValue;
          }),
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;
  useEffect(() => {
    alert("Person is sad, Let's make him smile !");
  }, []);
  return (
    <View style={styles.container}>
      <Men frame={String(frames)} />
      {showFinishButton ? (
        <TouchableOpacity
          onPress={() => {
            setFinishButton(false);
            setFrame(0);
          }}
          style={styles.restartButton}>
          <Text style={styles.btnText}>Restart </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            alignItems: 'center',
          }}>
          <Heart frame={frames} />
          <Animated.View
            style={[styles.ball, pan.getLayout()]}
            {...panResponder.panHandlers}>
            <Text style={{color: 'white'}}> Make him smile </Text>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  ball: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  restartButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'red',
    marginTop: 50,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default App;
