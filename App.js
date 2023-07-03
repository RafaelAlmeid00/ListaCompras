import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './routes';

export default function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}
