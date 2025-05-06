import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../Views/Colors/Color';
import { View } from 'native-base';

// Import screens
import HomeScreen from '../src/app/Home/HomeScreen';
import ChatScreen from '../src/app/Chat/ChatScreen';
import LikesScreen from '../src/app/Likes/LikesScreen';
import ProfileScreen from '../src/app/Profile/ProfileScreen';
import EditProfileScreen from '../src/app/Profile/EditProfileScreen';
import PolicyScreen from '../src/app/Profile/PolicyScreen';
import Header from '../Views/Components/Header';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => (
  <View style={{ flex: 1 }}>
    <Header 
      onSearch={(text) => console.log('Search:', text)}
      onProfilePress={() => console.log('Profile pressed')}
    />
    <View style={{ flex: 1 }}>
      {children}
    </View>
  </View>
);

export type RootStackParamList = {
  Home: undefined;
  Likes: undefined;
  Chat: undefined;
  Profile: undefined;
  MatchDetails: { id: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Policy: undefined;
};

const ProfileStack = () => (
  <Stack.Navigator
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

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.mutedText,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: Colors.primary + '20',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          shadowColor: Colors.primary,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Likes"
        component={LikesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
          headerShown: false,
          title: 'الإعجابات'
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
          headerShown: false,
          title: 'الملف الشخصي'
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator; 