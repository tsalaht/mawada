import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../../Views/Colors/Color';

const HomeScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <LinearGradient
        colors={[Colors.primary + '20', Colors.background, Colors.background]}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: Colors.text }}>Home Screen</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default HomeScreen; 