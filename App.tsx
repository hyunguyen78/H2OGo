import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
type Props = {};

const App = (props: Props) => {
  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 500});
  }, []);

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
