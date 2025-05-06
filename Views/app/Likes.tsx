import React from 'react';
import { View } from 'react-native';
import Header from '../Components/Header';

const Likes: React.FC = () => {
  const handleSearch = (text: string) => {
    console.log('Searching in Likes:', text);
  };

  const handleProfilePress = () => {
    console.log('Profile pressed from Likes');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header 
        onSearch={handleSearch}
        onProfilePress={handleProfilePress}
      />
      {/* Add your likes content here */}
    </View>
  );
};

export default Likes; 