import React from 'react';
import LottieView from 'lottie-react-native';

const Men = ({frame}) => {
  console.log(frame)
  return (
    <LottieView
      style={{width: '100%'}}
      progress={parseFloat(frame)}
      source={require('../Assets/face.json')}
      loop={false}
    />
  );
};

export default Men;
