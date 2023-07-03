import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './Home';
import Cadastro from './src/pages/cadastro';
import Login from './src/pages/login';
import Sistema from './src/pages/sistema';
import Mercados from './src/pages/mercados';
import Produtos from './src/pages/produtos';

const Stack = createStackNavigator();

export default function StackNav() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Sistema" component={Sistema} />
        <Stack.Screen name="Mercados" component={Mercados} />
        <Stack.Screen name="Produtos" component={Produtos} />
      </Stack.Navigator>
  );
}
