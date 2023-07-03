
import { View } from "react-native";
import styles from "./../styles/style";
import { Button } from "react-native-elements";

export default function Mercados() {
  return (
    <>
    <View style={styles.container}>
        <View style={styles.listbtn}>
            <Button title="Cadastrar Mercado" buttonStyle={{ backgroundColor: 'black', borderWidth: 2, borderColor: 'white', borderRadius: 30, marginTop: 10, width: 250, marginHorizontal: 10 }} titleStyle={{ fontWeight: 'bold' }}  />
        </View>
    </View>
    </>
  );
}
