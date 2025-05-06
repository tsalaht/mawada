import { Stack, View } from "native-base";
import React, { useState } from "react";
import { Text } from "native-base";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Home from "./Home";
import LikesScreen from '../../src/app/Likes/LikesScreen';
import ChatScreen from "../../src/app/Chat/ChatScreen";
import ProfileScreen from "../../src/app/Profile/ProfileScreen";
import Colors from "../Colors/Color";
import Chat from "app/Chat/Index";
import Profile from "app/Profile/Index";
interface Screen {
  name: string;
  component: React.FC<any>;
  icon: (props: { focused: boolean; color: string; size: number }) => React.ReactNode;
}

const Tab = createBottomTabNavigator();

const ProtectedScreens: React.FC = () => {
  const [focusedTab, setFocusedTab] = useState<string>("");

  const handleTabPress = (name: string) => {
    if (focusedTab !== name) {
      setFocusedTab(name);
    }
  };

  const commonTabBarStyle = {
    height: 90,
    backgroundColor: Colors.background,
    borderTopWidth: 0,
    elevation: 8,
    shadowOpacity: 0.1,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 8,
    paddingBottom: 25,
    paddingTop: 15,
    paddingHorizontal: 20,
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    marginBottom: 20,
  };

  const tabBarItemStyle = {
    paddingVertical: 12,
    marginBottom: 15,
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  const screens: Screen[] = [
    {
      name: "الرئيسية",
      component: Home,
      icon: ({ focused, color, size }) => (
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: focused ? 100 : 40,
          height: 40,
          backgroundColor: focused ? Colors.primary : 'transparent',
          paddingHorizontal: focused ? 4 : 0,
          paddingVertical: 8,
          borderRadius: 16,
        }}>
          <Ionicons name="home" size={22} color={focused ? Colors.background : Colors.mutedText} />
          {focused && (
            <Text 
              style={{
                color: Colors.background,
                fontWeight: "600",
                fontSize: 12,
                marginLeft: 4,
                textAlign: 'right',
                flexShrink: 1,
              }}
              numberOfLines={1}
            >
              الرئيسية
            </Text>
          )}
        </View>
      ),
    },
    {
      name: "الإعجابات",
      component: LikesScreen,
      icon: ({ focused, color, size }) => (
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: focused ? 100 : 40,
          height: 40,
          backgroundColor: focused ? Colors.primary : 'transparent',
          paddingHorizontal: focused ? 4 : 0,
          paddingVertical: 8,
          borderRadius: 16,
        }}>
          <AntDesign name="heart" size={22} color={focused ? Colors.background : Colors.mutedText} />
          {focused && (
            <Text 
              style={{
                color: Colors.background,
                fontWeight: "600",
                fontSize: 12,
                marginLeft: 4,
                textAlign: 'right',
                flexShrink: 1,
              }}
              numberOfLines={1}
            >
              الإعجابات
            </Text>
          )}
        </View>
      ),
    },
    {
      name: "المحادثات",
      component: Chat,
      icon: ({ focused, color, size }) => (
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: focused ? 100 : 40,
          height: 40,
          backgroundColor: focused ? Colors.primary : 'transparent',
          paddingHorizontal: focused ? 4 : 0,
          paddingVertical: 8,
          borderRadius: 16,
        }}>
          <Ionicons name="chatbubble-ellipses" size={22} color={focused ? Colors.background : Colors.mutedText} />
          {focused && (
            <Text 
              style={{
                color: Colors.background,
                fontWeight: "600",
                fontSize: 12,
                marginLeft: 4,
                textAlign: 'right',
                flexShrink: 1,
              }}
              numberOfLines={1}
            >
              المحادثات
            </Text>
          )}
        </View>
      ),
    },
    {
      name: "حسابي",
      component: Profile,
      icon: ({ focused, color, size }) => (
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: focused ? 100 : 40,
          height: 40,
          backgroundColor: focused ? Colors.primary : 'transparent',
          paddingHorizontal: focused ? 4 : 0,
          paddingVertical: 8,
          borderRadius: 16,
        }}>
          <Ionicons name="person" size={22} color={focused ? Colors.background : Colors.mutedText} />
          {focused && (
            <Text 
              style={{
                color: Colors.background,
                fontWeight: "600",
                fontSize: 12,
                marginLeft: 4,
                textAlign: 'right',
                flexShrink: 1,
              }}
              numberOfLines={1}
            >
              حسابي
            </Text>
          )}
        </View>
      ),
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="الرئيسية"
      screenOptions={{
        tabBarStyle: commonTabBarStyle,
        tabBarLabel: () => null,
        headerShown: false,
      }}
    >
      {screens.map((screen, index) => (
        <Tab.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarIcon: ({ focused, color, size }) => screen.icon({ focused, color, size }),
          }}
          listeners={{
            tabPress: () => handleTabPress(screen.name),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default ProtectedScreens;