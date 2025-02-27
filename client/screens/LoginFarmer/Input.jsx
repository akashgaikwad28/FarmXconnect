import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

export default function Input({
  label,
  placeholder,
  type = 'text',
  changeText,
  isMultiline = false,
}) {
  const [isSelected, setSelected] = useState(false);
  return (
    <View style={styles.inputView}>
      <Text style={styles.inputText}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={[
          isSelected ? styles.inputActive : styles.input,
          isMultiline && {
            minHeight: moderateVerticalScale(80),
            textAlignVertical: 'top',
          },
        ]}
        inputMode={type}
        onFocus={() => setSelected(true)}
        onBlur={() => setSelected(false)}
        multiline={isMultiline}
        secureTextEntry={type == 'password' ? true : false}
        onChangeText={(text) => changeText(text)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputText: {
    fontSize: scale(13),
    fontFamily: 'M-medium',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: moderateScale(300),
    height: moderateVerticalScale(40),
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  inputActive: {
    borderColor: '#2667ff',
    borderWidth: 1.5,
    width: moderateScale(300),
    height: moderateVerticalScale(40),
    marginTop: moderateVerticalScale,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  inputView: {
    marginTop: moderateVerticalScale(20),
    display: 'flex',
    alignItems: 'flex-start',
    width: moderateScale(300),
    gap: moderateVerticalScale(5),
  },
});
