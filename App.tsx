import Navigator from '@/Navigator';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
type Props = {};

const App = (props: Props) => {
  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 500});
  }, []);

  return <Navigator />;
};

export default App;
