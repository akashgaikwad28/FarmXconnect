import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export default function BottomNavigator() {
  const navigation = useNavigation();
  const route = useRoute();

  const [modalVisible, setModalVisible] = useState(false);

  const isActive = (screen) => route.name === screen;

  return (
    <View style={styles.container}>
      {/* Main Content */}
      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavigator}>
        {/* Home Tab */}
        <TouchableOpacity
          style={[
            styles.bottomNavigatorItem,
            isActive('Home') && styles.activeTab,
          ]}
          onPress={() => navigation.navigate('Home')}>
          <Icon
            name='home'
            size={scale(30)}
            color={isActive('Home') ? 'black' : '#d2d2d4'}
          />
          <Text
            style={isActive('Home') ? styles.activeText : styles.inactiveText}>
            Home
          </Text>
        </TouchableOpacity>

        {/* Add Tab - Opens Modal */}
        <TouchableOpacity
          style={[
            styles.bottomNavigatorItem,
            isActive('Add') && styles.activeTab,
          ]}
          onPress={() => setModalVisible(true)}>
          <Icon
            name='plus'
            size={scale(30)}
            color={isActive('Add') ? 'black' : '#c0c0c2'}
          />
          <Text
            style={isActive('Add') ? styles.activeText : styles.inactiveText}>
            Add
          </Text>
        </TouchableOpacity>

        {/* Trades Tab */}
        <TouchableOpacity
          style={[
            styles.bottomNavigatorItem,
            isActive('Trades') && styles.activeTab,
          ]}
          onPress={() => navigation.navigate('Trades')}>
          <Icon
            name='bar-chart'
            size={scale(30)}
            color={isActive('Trades') ? 'black' : '#c0c0c2'}
          />
          <Text
            style={
              isActive('Trades') ? styles.activeText : styles.inactiveText
            }>
            Trades
          </Text>
        </TouchableOpacity>

        {/* Profile Tab */}
        <TouchableOpacity
          style={[
            styles.bottomNavigatorItem,
            isActive('Profile') && styles.activeTab,
          ]}
          onPress={() => navigation.navigate('Profile')}>
          <Icon
            name='user'
            size={scale(30)}
            color={isActive('Profile') ? 'black' : '#c0c0c2'}
          />
          <Text
            style={
              isActive('Profile') ? styles.activeText : styles.inactiveText
            }>
            Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Add Button */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Icon name='close' color={'white'} size={scale(15)} />
              </TouchableOpacity>
            </View>
            <View style={styles.addBtnView}>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('AddPost');
                }}>
                <Icon2 name='post-outline' size={scale(30)} />
                <Text style={styles.btnText}>Post</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('AddTrade');
                }}>
                <Icon2 name='chart-bar' size={scale(30)} />
                <Text style={styles.btnText}>Trade</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontFamily: 'M-bold',
    fontSize: scale(15),
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: moderateScale(150),
    height: moderateVerticalScale(50),
    justifyContent: 'center',
    gap: moderateScale(10),
    borderRadius: scale(15),
    borderWidth: 1,
  },
  addBtnView: {
    height: moderateVerticalScale(100),
    marginTop: moderateVerticalScale(20),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateVerticalScale(10),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: moderateScale(20),
    marginTop: moderateVerticalScale(15),
  },
  container: {
    height: moderateVerticalScale(70),
    width: windowWidth,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomNavigatorItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(8),
  },
  bottomNavigator: {
    height: moderateVerticalScale(70),
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    zIndex: 100, // Ensures it stays above other content
  },
  activeTab: {
    borderTopWidth: 3,
    borderTopColor: '#007AFF',
  },
  activeText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontFamily: 'M-semibold',
  },
  inactiveText: {
    color: 'black',
    fontFamily: 'M-regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    height: moderateVerticalScale(200),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: moderateVerticalScale(10),
  },
  closeButton: {
    paddingVertical: moderateVerticalScale(8),
    paddingHorizontal: moderateScale(20),
    backgroundColor: 'black',
    borderRadius: scale(10),
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
