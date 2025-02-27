import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoText from '../SignUp/LogoText';
import BottomNaviagtor from '../Home/BottomNavigator';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TradeList from './TradeList';

const windowWidth = Dimensions.get('window').width;
export default function Trades() {
  const tradeData = [
    {
      id: 1,
      productName: 'Cotton',
      userName: 'Bhushan Rokade',
      location: 'Nashik',
      price: 'Rs.4000 / kg',
    },
    {
      id: 2,
      productName: 'Wheat',
      userName: 'Akash Gaikwad',
      location: 'Pune',
      price: 'Rs.2500 / quintal',
    },
    {
      id: 3,
      productName: 'Rice',
      userName: 'Kalpesh Kulkarni',
      location: 'Nagpur',
      price: 'Rs.3000 / quintal',
    },
    {
      id: 4,
      productName: 'Maize',
      userName: 'Rahul Patil',
      location: 'Solapur',
      price: 'Rs.2000 / quintal',
    },
    {
      id: 5,
      productName: 'Maize',
      userName: 'Vinayak Teli',
      location: 'Solapur',
      price: 'Rs.2000 / quintal',
    },
    {
      id: 6,
      productName: 'Maize',
      userName: 'Aditya Gaikwad',
      location: 'Solapur',
      price: 'Rs.2000 / quintal',
    },
    {
      id: 7,
      productName: 'Maize',
      userName: 'Akshay Patil',
      location: 'Solapur',
      price: 'Rs.2000 / quintal',
    },
  ];

  return (
    <>
      <StatusBar translucent backgroundColor='white' barStyle='dark-content' />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, alignItems: 'center' }}>
          <LogoText />
          <View style={styles.tradeMenus}>
            <TouchableOpacity style={styles.tradeMenuItem}>
              <Text style={styles.tradeItemText}>Previous Trades</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tradeMenuItem}>
              <Text style={styles.tradeItemText}>Ongoing Trades</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tradeMenuItem}>
              <Text style={styles.tradeItemText}>Trade Requests</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nearbyTradesView}>
            <Text style={styles.nearbyHeading}>Trades Near You</Text>
            <View style={styles.TradeListView}>
              <TradeList data={tradeData} />
            </View>
          </View>
        </KeyboardAvoidingView>
        <BottomNaviagtor />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  TradeListView: {
    flex: 1,
    marginTop: scale(10),
  },
  nearbyHeading: {
    fontFamily: 'M-bold',
    fontSize: scale(15),
  },
  nearbyTradesView: {
    flex: 1,
    width: windowWidth,
    marginTop: moderateVerticalScale(20),
    paddingHorizontal: moderateScale(20),
  },
  tradeItemText: {
    fontFamily: 'M-bold',
    fontSize: scale(10),
  },
  tradeMenuItem: {
    paddingHorizontal: moderateScale(10),
    borderWidth: 0.8,
    paddingVertical: moderateVerticalScale(7),
    borderRadius: scale(10),
    backgroundColor: '#f2f2f2',
  },
  tradeMenus: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: windowWidth,
    marginTop: moderateVerticalScale(25),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: moderateVerticalScale(40),
  },
});
