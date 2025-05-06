import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from "./NotificationScreen";
import NotificationDetail from "./NotificationDetail";


const Stack = createNativeStackNavigator();

const Notification: React.FC<any> = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDetail}
        options={{
          headerShown: false,
        }}
      />

    
   
    
    </Stack.Navigator>
  );
};

export default Notification;
