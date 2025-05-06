import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Colors/Color';
  import ProfileScreen from '../../../src/app/Profile/ProfileScreen';
  import EditProfileScreen from '../../../src/app/Profile/EditProfileScreen';
  import PolicyScreen from '../../../src/app/Profile/PolicyScreen';

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Policy: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: (props) => (
          <MaterialIcons 
            name="arrow-back" 
            size={24} 
            color={Colors.text} 
            onPress={props.onPress}
            style={{ marginLeft: 10 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{
          title: 'الملف الشخصي',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'تعديل الملف الشخصي',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Policy"
        component={PolicyScreen}
        options={{
          title: 'سياسة الخصوصية',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator; 