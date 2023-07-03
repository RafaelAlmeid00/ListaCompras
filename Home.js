import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from "./src/styles/style";
import { Feather } from "react-native-vector-icons";
import { Card } from '@rneui/themed';
import React from 'react';
import { Button } from 'react-native-elements';

export default function HomeScreen({ navigation }) {
  const token = localStorage.getItem('token')


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Feather name="shopping-cart" size={22} /> Lista de Compras
      </Text>
      <Card>
        <Button
              title="CADASTRE-SE"
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={() => navigation.navigate("Cadastro")}
            >
          <View>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10
              }}
            >
              CADASTRE-SE
            </Text>
          </View>
        </Button>
        <Button
              title="LOGIN"
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={() => navigation.navigate("Login")}
            >
          <View>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10
              }}
            >
              CADASTRE-SE
            </Text>
          </View>
        </Button>
      </Card>
      <StatusBar style="auto" />
    </View>
  );
}
