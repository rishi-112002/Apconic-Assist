import React from "react"
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native"
import AuthStack from "./src/navigation/HomeNavigation"
import { store } from "./src/redux/Store";
function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </SafeAreaProvider>
     </Provider>
  )
}
export default App