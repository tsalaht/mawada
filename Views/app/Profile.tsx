import React from 'react';
import { View } from 'react-native';
import Header from '../Components/Header';

const Profile: React.FC = () => {
  const handleSearch = (text: string) => {
    console.log('Searching in Profile:', text);
  };

  const handleProfilePress = () => {
    console.log('Profile pressed from Profile');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header 
        onSearch={handleSearch}
        onProfilePress={handleProfilePress}
      />
      {/* Add your profile content here */}
    </View>
  );
};

export default Profile; 