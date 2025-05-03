import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { StyleSheet, Text, View,SafeAreaView ,I18nManager} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { NativeBaseProvider, extendTheme } from "native-base";
import AuthPages from "./Views/Auth/Index";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";

import store from "./store/store";
import Screens from "./Views/Index";
export default function App() {

  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    if (I18nManager.isRTL) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
    }
  }, []);
  let [fontsLoaded] = useFonts({
  Tajawal_200ExtraLight: require("./assets/fonts/Tajawal/Tajawal-ExtraLight.ttf"),
  Tajawal_300Light: require("./assets/fonts/Tajawal/Tajawal-Light.ttf"),
  Tajawal_400Regular: require("./assets/fonts/Tajawal/Tajawal-Regular.ttf"),
  Tajawal_500Medium: require("./assets/fonts/Tajawal/Tajawal-Medium.ttf"),
  Tajawal_700Bold: require("./assets/fonts/Tajawal/Tajawal-Bold.ttf"),
  Tajawal_800ExtraBold: require("./assets/fonts/Tajawal/Tajawal-ExtraBold.ttf"),
  Tajawal_900Black: require("./assets/fonts/Tajawal/Tajawal-Black.ttf"),
  });

  const newFontTheme = {
    fontConfig: {
      Tajawal: {
      
        200: {
          normal: "Tajawal_200ExtraLight",
        },
        300: {
          normal: "Tajawal_300Light",
        },
        400: {
          normal: "Tajawal_400Regular",
        },
        500: {
          normal: "Tajawal_500Medium",
        },
        600: {
          normal: "Tajawal_600SemiBold",
        },
        700: {
          normal: "Tajawal_700Bold",
        },
        800: {
          normal: "Tajawal_800ExtraBold",
        },
        900: {
          normal: "Tajawal_900Black",
        },
      },
    },
    fonts: {
      heading: "Tajawal",
      body: "Tajawal",
      mono: "Tajawal",
    },
  };

  const theme = extendTheme({ ...newFontTheme });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch((error) => {
        console.warn("Error hiding splash screen:", error);
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>

        <NativeBaseProvider theme={theme}>
          <NavigationContainer >
    <Screens/>
          </NavigationContainer>
        </NativeBaseProvider>
 
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width:'100%'
  },
});
