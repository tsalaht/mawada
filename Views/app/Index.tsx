import { Stack, View } from "native-base";
import React, { useState } from "react";
import { Text } from "native-base";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import Home from "./Home";
import Colors from "../Colors/Color";


interface Screen {
  name: string;
  component: React.FC<any>;
  icon: React.FC<{ focused: boolean }>;
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
    height: 50,
    backgroundColor: Colors.primary,
    borderTopWidth: 0,
    borderRadius:24,
    marginBottom: 10,
    marginLeft: 6,
    marginRight: 10,
  };

  const screens: Screen[] = [
    {
      name: "الرئيسية",
      component: Home,
      icon: ({ focused }) => (
        <AntDesign name="home" size={22} color={focused ? "#FFFFFF" : "#6F6F6F"} />
      ),
    },
    {
      name: "الإشعارات",
      component: Home,
      icon: ({ focused }) => (
        <AntDesign name="notification" size={22} color={focused ? "#FFFFFF" : "#6F6F6F"} />
      ),
    },
    {
      name: "السجل",
      component: Home,
      icon: ({ focused }) => (
        <AntDesign name="clockcircleo" size={22} color={focused ? "#FFFFFF" : "#6F6F6F"} />
      ),
    },
    {
      name: "حسابي",
      component: Home,
      icon: ({ focused }) => (
        <AntDesign name="user" size={22} color={focused ? "#FFFFFF" : "#6F6F6F"} />
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
            tabBarIcon: ({ focused } :any) => screen.icon({ focused }),
            tabBarLabel: ({ focused } :any) => (
              <Text color={focused ? "#FFFFFF" : "#6F6F6F"} fontWeight={500} fontSize={"10px"}>
                {screen.name}
              </Text>
            ),
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