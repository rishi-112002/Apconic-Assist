import React from "react"
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native"
import AuthStack from "./src/navigation/HomeNavigation"
// import { enableScreens } from 'react-native-screens';
// enableScreens();
function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
export default App