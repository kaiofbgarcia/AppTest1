import React from 'react';
import { StyleSheet, View } from 'react-native';
import VideoProcessing from './components/VideoProcessing';

export default function App() {
  return (
    <View style={styles.container}>
      <VideoProcessing />
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
