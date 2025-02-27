import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  scale,
  moderateVerticalScale,
  moderateScale,
} from 'react-native-size-matters';
import LogoText from '../SignUp/LogoText';
import BottomNavigator from './BottomNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostList from './PostList';

export default function Home() {
  const data = [
    {
      name: 'Bhushan Rokade',
      location: 'Pune',
      role: 'Farmer',
      caption: 'I have 10 quintal of wheat to sell',
      imageUrl:
        'https://i0.wp.com/eos.org/wp-content/uploads/2023/05/grape-farming-nashik.jpg?fit=1200%2C675&ssl=1',
    },
    {
      name: 'Akash Gaikwad',
      location: 'Sambhaji Nagar',
      role: 'Trader',
      caption: 'I have 10 quintal of wheat to sell',
      imageUrl:
        'https://media.istockphoto.com/id/543212762/photo/tractor-cultivating-field-at-spring.jpg?s=612x612&w=0&k=20&c=uJDy7MECNZeHDKfUrLNeQuT7A1IqQe89lmLREhjIJYU=',
    },
    {
      name: 'Kalpesh Kulkarni',
      location: 'Raigad',
      role: 'Farmer',
      caption: 'I have 10 quintal of wheat to sell',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2rmfZjvadVIf3vUQdt3hRazwDq-MKEpkbXQ&s',
    },
  ];

  const [searchText, setSearchText] = useState('');

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
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            <LogoText />
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder='Search by trades...'
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
              <TouchableOpacity>
                <Icon name='search' size={scale(20)} />
              </TouchableOpacity>
            </View>
            <View style={styles.postContainer}>
              <Text style={styles.postHeading}>Top Posts Near You</Text>
              <PostList data={data} isScrollable />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <BottomNavigator />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  postHeading: {
    fontFamily: 'M-bold',
    fontSize: moderateScale(15),
  },
  postContainer: {
    width: moderateScale(330),
    marginTop: moderateVerticalScale(20),
  },
  searchInput: {
    fontFamily: 'M-semibold',
    width: moderateScale(200),
  },
  searchBar: {
    width: moderateScale(320),
    backgroundColor: '#F5F2F2',
    height: moderateVerticalScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    borderRadius: scale(20),
    marginTop: moderateVerticalScale(20),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: moderateVerticalScale(20),
  },
});
