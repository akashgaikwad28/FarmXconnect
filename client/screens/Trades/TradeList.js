import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Icon2 from 'react-native-vector-icons/Ionicons';
export default function TradeList({ data }) {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={data}
      contentContainerStyle={{
        paddingBottom: moderateVerticalScale(10),
        gap: scale(10),
      }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.tradeListItem}>
          <View style={styles.productText}>
            <Text style={styles.productName}>{item.productName}</Text>
            <Text style={styles.userName}>By {item.userName}</Text>
            <Text style={styles.locationText}>
              <Icon2 name='location-outline' size={14} /> {item.location}
            </Text>
          </View>
          <View style={styles.priceText}>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  price: {
    fontFamily: 'M-bold',
    fontSize: scale(12),
  },
  priceText: {
    height: moderateVerticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    fontFamily: 'M-semibold',
    fontSize: scale(10),
    color: 'grey',
    textAlignVertical: 'center',
  },
  productName: {
    fontFamily: 'M-bold',
    fontSize: scale(12),
  },
  userName: {
    fontFamily: 'M-semibold',
    fontSize: scale(10),
  },
  tradeListItem: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    minHeight: moderateVerticalScale(60),
    borderRadius: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: moderateVerticalScale(10),
    paddingHorizontal: moderateScale(10),
  },
});
