import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '../styles/style';
import { Feather } from 'react-native-vector-icons'
import { Button, Dialog } from 'react-native-elements';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const [senhabool, setSenhabool] = React.useState(true)
  const [eye, setEye] = React.useState('eye-slash')
  const [dialogContent, setDialogContent] = React.useState(null);


  const handleCloseDialog = () => {
    setDialogContent(null);
  };


  const handleeye = () => {
    if (senhabool == true) {
      setSenhabool(false)
      setEye('eye')
    }
  }

  const handlelogin = async () => {
    if (!senha || !email) {
      setDialogContent(
            <Dialog isVisible={true} onBackdropPress={true}>
              <TouchableOpacity onPress={handleCloseDialog}>
                  <Feather name="x" size={20} />
                </TouchableOpacity>
              <Dialog.Title>Campos vazios!</Dialog.Title>
              <Text>Verifique se há algum campo vazio.</Text>
            </Dialog>
      )
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setDialogContent(
            <Dialog isVisible={true} onBackdropPress={true}>
            <TouchableOpacity onPress={handleCloseDialog}>
                  <Feather name="x" size={20} />
                </TouchableOpacity>
              <Dialog.Title title="Email Incorreto!" />
            <Text>Verifique seu email.</Text>
          </Dialog>
      )
    } else {
      const dadosUsuario = {
      user_email: email,
      user_senha: senha,
      }
          console.log(dadosUsuario);

      try {
        const response = await axios.post('http://localhost:3344/user/login', dadosUsuario);
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
            <Text style={{color: 'green', fontSize: 20, fontWeight: 'bold'}}>Logado com sucesso!</Text>
          );
    console.log(response.status);
    console.log(response.data);
        console.log('test', response.data.token);
        console.log(response);
        console.log(response.data.user);
        if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                console.log(localStorage);
        }
    navigation.navigate('Sistema')
    }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
   <View style={styles.container}>
      {dialogContent}
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
                name: eye,
                type: 'font-awesome',
                size: 20,
                color: 'black',
              }}
              buttonStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              }}
              onPress={handleeye}
            />
      </View>
      <Button
              title="ENTRAR"
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
              onPress={handlelogin}
            />
    </View>
  );
}

export default Login;
