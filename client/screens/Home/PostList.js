import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Fontisto';

export default function PostList({ data, isScrollable }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      scrollEnabled={isScrollable}
      renderItem={({ item }) => (
        <View style={styles.postView}>
          <View style={styles.postItem}>
            <View style={styles.headView}>
              <View style={styles.userNameView}>
                <Text style={styles.userText}>{item.name}</Text>
                <Text style={styles.locationText}>
                  <Icon2 name='location-outline' size={14} /> {item.location}
                </Text>
              </View>
              {item.role === 'Farmer' ? (
                <Image
                  source={require('../../assets/farmer.png')}
                  style={styles.image}
                />
              ) : (
                <Icon3
                  name='shopping-store'
                  style={styles.iconShop}
                  size={scale(25)}
                />
              )}
            </View>
            <View style={styles.postImgContainer}>
              <Image
                source={{
                  uri: item.imageUrl || 'https://via.placeholder.com/150',
                }}
                style={styles.postImg}
              />
            </View>
            <View style={styles.captionContainer}>
              <Text style={styles.captionText}>{item.caption}</Text>
              <TouchableOpacity style={styles.sendBtn}>
                <Icon name='send-o' size={scale(25)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  sendBtnText: {
    fontFamily: 'M-semibold',
    fontSize: moderateScale(10),
  },
  sendBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionText: {
    fontFamily: 'M-semibold',
    width: moderateScale(250),
    fontSize: moderateScale(12),
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(10),
  },
  postImgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(20),
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  postImg: {
    width: scale(280),
    height: scale(150),
    resizeMode: 'cover',
    borderRadius: scale(15),
  },
  locationText: {
    fontFamily: 'M-semibold',
    fontSize: scale(10),
    color: 'grey',
    textAlignVertical: 'center',
  },
  userText: {
    fontFamily: 'M-semibold',
    fontSize: moderateScale(15),
  },
  userNameView: {
    display: 'flex',
  },
  image: {
    height: moderateVerticalScale(35),
    width: moderateScale(35),
    resizeMode: 'contain',
  },
  headView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(10),
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  postItem: {
    minHeight: moderateVerticalScale(320),
    borderRadius: scale(15),
    borderWidth: 0.8,
    borderColor: '#CDCBCB',
    display: 'flex',
    flexDirection: 'column',
  },
  postView: {
    width: moderateScale(330),
    flex: 1,
    marginTop: moderateVerticalScale(10),
    gap: scale(8),
  },
});
