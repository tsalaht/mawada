import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProtectedScreens from "./Index";
import Notification from "app/Notification/Index";
import Upgrade from "app/Upgrade/Upgrade";
import ChatRoom from "app/Chat/chatRoom";


const Stack = createNativeStackNavigator();

const Screens: React.FC<any> = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="ProtectedScreens"
        component={ProtectedScreens}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Upgrade"
        component={Upgrade}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          headerShown: false,
        }}
      />

    
   
    
    </Stack.Navigator>
  );
};

export default Screens;
