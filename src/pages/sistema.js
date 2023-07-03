
import styles from "./../styles/style";
import { Button, Dialog } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from 'react-native-vector-icons'
import axios from 'axios';


export default function Sistema() {
    const navigation = useNavigation()
  const [verify, setVerify] = React.useState(false)
    const [start, setStart] = React.useState(true)
 const [nome, setNome] = React.useState('')
  const [bairro, setBairro] = React.useState('')
  const [dialogContent, setDialogContent] = React.useState(null);
const user = JSON.parse(localStorage.getItem("user"));
const id = user.user_id

  const handleCloseDialog = () => {
    setDialogContent(null);
  };
     const merc = () => {
    navigation.push('Mercados');
  };
const prod = () => {
    navigation.push('Produtos');
  };
  const bool = () => {
    setVerify(true);
    setStart(false)
  };

    const handleMercado = async () => {
        if (!nome || !bairro) {
            setDialogContent(
          <Dialog isVisible={true} onBackdropPress={true}>
            <TouchableOpacity onPress={handleCloseDialog}>
                  <Feather name="x" size={20} />
                </TouchableOpacity>
            <Dialog.Title title="Campo vazio!" />
            <Text>Verifique se alguns dos campos não está vazio.</Text>
          </Dialog>
        );
        } else {
            const dados = {
                merc_nome: nome,
                merc_bairro: bairro,
                user_id: id
            }
            console.log(dados);
            try {
                const response = await axios.post('https://localhost:3344/mercado', dados)
                console.log(response.status);
                setVerify(false)
            } catch (error) {
                console.log(error);
            }
        }
    }
  
  return (
    <View style={styles.container}>
        {dialogContent}
        <View style={styles.listbtn}>
            <Button title="Mercados" buttonStyle={{ backgroundColor: 'black', borderWidth: 2, borderColor: 'white', borderRadius: 30, marginTop: 10, width: 150, marginHorizontal: 10 }} titleStyle={{ fontWeight: 'bold' }} onPress={merc} />
            <Button title="Produtos" buttonStyle={{ backgroundColor: 'black', borderWidth: 2, borderColor: 'white', borderRadius: 30, marginTop: 10, width: 150, marginHorizontal: 10 }} titleStyle={{ fontWeight: 'bold' }} onPress={prod}/>
        </View>
        { start &&
        <View style={styles.listbtn}>
            <Button title="Começar" buttonStyle={{ backgroundColor: 'black', borderWidth: 2, borderColor: 'white', borderRadius: 30, marginTop: 10, width: 150, marginHorizontal: 10 }} titleStyle={{ fontWeight: 'bold' }} onPress={bool} />
        </View>
}
{
    verify && 
     <View style={styles.container}>
      <Text style={styles.label}>Digite o nome do Mercado que está:</Text>
      <View style={styles.inputContainer}>
      <Feather name='shopping-cart' size={20} />
      <TextInput placeholder='Supermaket' style={styles.input} value={nome} onChangeText={setNome}/>
      </View>
      <Text style={styles.label}>Digite o bairro:</Text>
      <View style={styles.inputContainer}>
      <Feather name='map-pin' size={20} />
      <TextInput placeholder='Santo Agostinho' style={styles.input} value={bairro} onChangeText={setBairro}/>
      </View>
      <Button
              title="ENVIAR"
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
                marginTop: 10,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={handleMercado}
            />
    </View>
}
    </View>
  );
}
