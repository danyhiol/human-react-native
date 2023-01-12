import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import FaceID from './src/components/face-id';
import { NativeBaseProvider } from 'native-base';

import { HumanText } from './src/components/human';

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text>Human React-Native-Test</Text>
        <HumanText />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
