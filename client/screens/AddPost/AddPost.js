import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
  Button,
  Alert,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import BottomNavigator from '../Home/BottomNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Input from '../LoginFarmer/Input';
import * as ImagePicker from 'expo-image-picker';

const windowWidth = Dimensions.get('window').width;

export default function AddPost() {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [postLocation, setPostLocation] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [count, setCount] = useState({ photoCount: 0, videoCount: 0 });

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Allow access to media library to pick an image.'
      );
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      quality: 0.5,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets);
    }
  };
  useEffect(() => {
    let videoCount = 0,
      photoCount = 0;
    selectedImage?.map((item) => {
      if (item.type === 'video') videoCount++;
      else if (item.type === 'image') photoCount++;
    });
    setCount({ photoCount, videoCount });
  }, [selectedImage]);

  return (
    <>
      <StatusBar translucent backgroundColor='white' barStyle='dark-content' />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, alignItems: 'center' }}>
          <View style={styles.formView}>
            <Input
              label={'Post Location'}
              placeholder={'Enter Location Name'}
              changeText={setPostLocation}
            />
            <Input
              label={'Post Description'}
              placeholder={'Enter Post Description'}
              changeText={setPostDescription}
              isMultiline={true}
            />
            {/* Image Picker Button */}
            <View style={styles.imagePickerView}>
              <Text style={styles.imagePickerText}>Upload Images</Text>
              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={pickImage}>
                <Text style={styles.buttonText}>Click Here</Text>
              </TouchableOpacity>
            </View>

            {/* Display Selected Image */}
            {selectedImage && (
              <ImageBackground
                source={{ uri: selectedImage[0]?.uri }}
                style={styles.imagePreview}
                blurRadius={15}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'M-bold',
                  }}>
                  + {count.photoCount} Images and + {count.videoCount} Videos
                </Text>
              </ImageBackground>
            )}
            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <BottomNavigator />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
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
  imagePickerText: {
    fontFamily: 'M-semibold',
    fontSize: scale(13),
  },
  imagePickerView: {
    marginTop: moderateVerticalScale(60),
    width: moderateScale(300),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.8,
    borderRadius: scale(10),
    paddingHorizontal: moderateVerticalScale(10),
    paddingVertical: moderateVerticalScale(10),
  },
  formView: {
    width: windowWidth,
    alignItems: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imagePickerButton: {
    paddingVertical: moderateVerticalScale(5),
    paddingHorizontal: moderateScale(10),
    backgroundColor: '#f2f2f2',
    borderRadius: scale(10),
    width: moderateScale(110),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: scale(14),
    fontFamily: 'M-bold',
  },
  imagePreview: {
    width: moderateScale(300),
    height: moderateVerticalScale(150),
    marginTop: moderateVerticalScale(20),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
