import React from 'react';
import LottieView from 'lottie-react-native';

const Heart = ({frame}) => {
  return (
    <LottieView
      style={{width: 150}}
      progress={frame}
      source={require('../Assets/heart.json')}
      loop={false}
    />
  );
};

export default Heart;
