import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Input from './Input';
import { ScrollView } from 'react-native-gesture-handler';

export default function LoginFarmer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const submitHandle = () => {
    console.log(email, ' ', password);
    navigation.navigate('Home');
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
            keyboardShouldPersistTaps='handled'>
            <Text style={styles.heading}>Login Farmer</Text>
            <Image
              source={require('../../assets/farmer.png')}
              style={styles.image}
            />
            <View style={styles.formView}>
              <Input
                label='Email'
                placeholder='Enter your email'
                type='email'
                changeText={setEmail}
              />
              <Input
                label='Password'
                placeholder='Enter your password'
                type='password'
                changeText={setPassword}
              />
              <TouchableOpacity style={styles.submitBtn} onPress={submitHandle}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.text1}>
              Don't have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('SignUp')}>
                Sign up
              </Text>
            </Text>
            <Text style={styles.text2}>
              Are You A Trader?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('LoginTrader')}>
                Login Here
              </Text>
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: moderateVerticalScale(20),
  },
  heading: {
    fontSize: scale(20),
    marginTop: moderateVerticalScale(20),
    fontFamily: 'M-bold',
  },
  image: {
    width: moderateScale(80),
    height: moderateVerticalScale(70),
    marginTop: moderateVerticalScale(35),
    borderRadius: moderateScale(40),
    resizeMode: 'contain',
  },
  formView: {
    width: moderateScale(300),
    marginTop: moderateVerticalScale(5),
    alignItems: 'center',
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
  text1: {
    fontFamily: 'M-medium',
    fontSize: scale(15),
    marginTop: moderateVerticalScale(30),
  },
  text2: {
    fontFamily: 'M-medium',
    fontSize: scale(13),
    marginTop: moderateVerticalScale(15),
  },
  link: {
    color: '#2667ff',
    fontFamily: 'M-bold',
  },
});
