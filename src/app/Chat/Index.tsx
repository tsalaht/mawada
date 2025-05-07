import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from "./ChatScreen";
import chatRoom from "./chatRoom";



const Stack = createNativeStackNavigator();

const Chat: React.FC<any> = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      /> 
      </Stack.Navigator>
  );
};

export default Chat;
