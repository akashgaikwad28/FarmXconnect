import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';

export default function ToggleButton({ onChange }) {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: moderateScale(20),
      }}>
      <Text style={{ fontFamily: 'M-semibold', fontSize: moderateScale(16) }}>
        Are You A {isEnabled ? 'Farmer' : 'Trader'}
      </Text>
      <Switch
        trackColor={{ false: '#81b0ff', true: 'green' }}
        thumbColor='#f4f3f4'
        ios_backgroundColor='#3e3e3e'
        onValueChange={() => {
          setIsEnabled(!isEnabled);
          onChange(!isEnabled ? 'Farmer' : 'Trader');
        }}
        value={isEnabled}
      />
    </View>
  );
}
