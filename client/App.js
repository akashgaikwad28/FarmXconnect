import AppNavigator from './navigation/navigator';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadResources() {
      try {
        await Font.loadAsync({
          'M-black': require('./assets/fonts/M-black.ttf'),
          'M-blacki': require('./assets/fonts/M-blacki.ttf'),
          'M-bold': require('./assets/fonts/M-bold.ttf'),
          'M-boldi': require('./assets/fonts/M-boldi.ttf'),
          'M-light': require('./assets/fonts/M-light.ttf'),
          'M-lighti': require('./assets/fonts/M-lighti.ttf'),
          'M-medium': require('./assets/fonts/M-medium.ttf'),
          'M-mediumi': require('./assets/fonts/M-mediumi.ttf'),
          'M-regular': require('./assets/fonts/M-regular.ttf'),
          'M-exbold': require('./assets/fonts/M-exbold.ttf'),
          'M-exboldi': require('./assets/fonts/M-exboldi.ttf'),
          'M-semibold': require('./assets/fonts/M-semibold.ttf'),
          'M-semiBi': require('./assets/fonts/M-semiBi.ttf'),
        });

        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    loadResources();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <AppNavigator />;
}
