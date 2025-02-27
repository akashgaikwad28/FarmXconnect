import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  moderateVerticalScale,
  moderateScale,
  scale,
} from 'react-native-size-matters';
import Input from '../LoginFarmer/Input';
import ToggleButton from './ToggleButton';
import LogoText from './LogoText';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('Trader');
  const submitHandle = () => {
    const data = {
      name: name,
      email: email,
      password: password,
      location: location,
      role: role,
    };
    console.log(data);
  };
  return (
    <>
      <StatusBar translucent backgroundColor='white' barStyle='dark-content' />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}>
            <LogoText />
            <View style={styles.formView}>
              <Text style={styles.heading}>Sign Up</Text>
              <Input
                label='Name'
                placeholder='Enter your name'
                type='text'
                changeText={(text) => setName(text)}
              />
              <Input
                label='Email'
                placeholder='Enter your email'
                type='email'
                changeText={(text) => setEmail(text)}
              />
              <Input
                label={'Location'}
                type={'text'}
                placeholder={'Enter your location'}
                changeText={(text) => setLocation(text)}
              />
              <Input
                label='Password'
                type='password'
                placeholder={'Choose your password'}
                changeText={(text) => setPassword(text)}
              />
              <View style={{ marginTop: moderateVerticalScale(10) }}>
                <ToggleButton onChange={setRole} />
              </View>
              <TouchableOpacity style={styles.submitBtn} onPress={submitHandle}>
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: moderateVerticalScale(20),
  },
  submitBtn: {
    backgroundColor: '#089e03',
    width: moderateScale(120),
    height: moderateVerticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(15),
    marginTop: moderateVerticalScale(30),
  },
  btnText: {
    fontSize: scale(13),
    fontFamily: 'M-bold',
    color: 'white',
  },
  formView: {
    marginTop: moderateVerticalScale(35),
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'M-bold',
    fontSize: scale(20),
    marginTop: moderateVerticalScale(20),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
