import React from 'react';
import { View } from 'react-native';
import Header from '../Components/Header';

const Chats: React.FC = () => {
  const handleSearch = (text: string) => {
    console.log('Searching in Chats:', text);
  };

  const handleProfilePress = () => {
    console.log('Profile pressed from Chats');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header 
        onSearch={handleSearch}
        onProfilePress={handleProfilePress}
      />
      {/* Add your chats content here */}
    </View>
  );
};

export default Chats; 