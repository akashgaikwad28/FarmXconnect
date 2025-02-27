import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

export default function LogoText() {
  return (
    <Text style={styles.farmText}>
      Farm<Text style={styles.x}>X</Text>
      <Text style={styles.connect}>connect</Text>
    </Text>
  );
}
const styles = StyleSheet.create({
  farmText: {
    marginTop: moderateVerticalScale(20),
    fontFamily: 'M-bold',
    fontSize: scale(25),
    color: 'green',
  },
  x: {
    color: 'black',
    fontSize: scale(30),
  },
  connect: {
    color: '#2667ff',
    fontSize: scale(25),
  },
});
