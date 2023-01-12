import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { HumanTest } from './src/components/human';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Human React-Native-Test</Text>
      <HumanTest />
      <StatusBar style="auto" />
    </View>
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
