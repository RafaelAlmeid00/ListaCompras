import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '../styles/style';
import { Feather } from 'react-native-vector-icons'
import { Button, Dialog } from 'react-native-elements';
import axios from 'axios';

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const [verify, setVerify] = React.useState('')
  const [senhabool, setSenhabool] = React.useState(true)
  const [verifybool, setVerifybool] = React.useState(true)
  const [eye1, setEye1] = React.useState('eye-slash')
  const [eye2, setEye2] = React.useState('eye-slash')
  const [dialogContent, setDialogContent] = React.useState(null);


  const handleCloseDialog = () => {
    setDialogContent(null);
  };


  const handleeye1 = () => {
    if (senhabool == true) {
      setSenhabool(false)
      setEye1('eye')
    }
  }

  const handleeye2 = () => {
    if (verifybool == true) {
      setVerifybool(false)
      setEye2('eye')
    }
  }

  const handlecad = async () => {
console.log('ta indo');
      console.log('ta indo');

    if (senha != verify) {
       setDialogContent(
          <Dialog isVisible={true} onBackdropPress={true}>
            <TouchableOpacity onPress={handleCloseDialog}>
                  <Feather name="x" size={20} />
                </TouchableOpacity>
            <Dialog.Title title="Senhas não compatíveis!" />
            <Text>Verifique se as duas senhas estão corretas.</Text>
          </Dialog>
        );
    } else if (!nome || !email || !senha) {
      setDialogContent(
          <Dialog isVisible={true} onBackdropPress={true}>
            <TouchableOpacity onPress={handleCloseDialog}>
                  <Feather name="x" size={20} />
                </TouchableOpacity>
            <Dialog.Title title="Campo vazio!" />
            <Text>Verifique se alguns dos campos não está vazio.</Text>
          </Dialog>
        );
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  setDialogContent(
          <Dialog isVisible={true} onBackdropPress={true}>
            <TouchableOpacity onPress={handleCloseDialog}>
                  <Feather name="x" size={20} />
                </TouchableOpacity>
              <Dialog.Title title="Email Incorreto!" />
            <Text>Verifique seu email.</Text>
          </Dialog>
        );
} else {
  console.log('ta indo');

    const dadosUsuario = {
      user_nome: nome,
      user_email: email,
      user_senha: senha,
    }
    console.log(dadosUsuario);

    try {
    const response = await axios.post('http://localhost:3344/user', dadosUsuario);
   if (!response) {
     setDialogContent(
            <Dialog isVisible={true} onBackdropPress={true}>
              <TouchableOpacity onPress={handleCloseDialog}>
                  <Feather name="x" size={20} />
                </TouchableOpacity>
              <Dialog.Title>Deu merda!</Dialog.Title>
              <Text>É foda parceiro.</Text>
            </Dialog>
          );
   } else{
    setDialogContent(
            <Text style={{color: 'green', fontSize: 20, fontWeight: 'bold'}}>Cadastrado com sucesso!</Text>
          );
    console.log(response.status);
    navigation.navigate('Login')
   }
    } catch (error) {
      console.log(error);
    }
  }
}


  return (
    <View style={styles.container}>
      {dialogContent}
      <Text style={styles.label}>Digite seu nome:</Text>
      <View style={styles.inputContainer}>
      <Feather name='user' size={20} />
      <TextInput placeholder='Fulano da Silva Silveira' style={styles.input} value={nome} onChangeText={setNome}/>
      </View>
      <Text style={styles.label}>Digite seu email:</Text>
      <View style={styles.inputContainer}>
      <Feather name='mail' size={20} />
      <TextInput placeholder='abcdef@gmail.com' style={styles.input} value={email} onChangeText={setEmail}/>
      </View>
      <Text style={styles.label}>Digite sua senha:</Text>
      <View style={styles.inputContainer}>
      <Feather name='lock' size={20} />
      <TextInput placeholder='Password' secureTextEntry={senhabool} style={styles.input} value={senha} onChangeText={setSenha}/>
      <Button
              icon={{
                name: eye1,
                type: 'font-awesome',
                size: 20,
                color: 'black',
              }}
              buttonStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              }}
              onPress={handleeye1}
            />
      </View>
      <Text style={styles.label}>Digite sua senha novamente:</Text>
      <View style={styles.inputContainer}>
      <Feather name='lock' size={20} />
      <TextInput placeholder='Password' secureTextEntry={verifybool} style={styles.input} value={verify} onChangeText={setVerify}/>
      <Button
              icon={{
                name: eye2,
                type: 'font-awesome',
                size: 20,
                color: 'black',
              }}
              buttonStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              }}
              onPress={handleeye2}
            />
      </View>
      <Button
              title="CADASTRAR"
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
              onPress={handlecad}
            />
    </View>
  );
}

export default Cadastro;
