import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { ModalPassword } from '../../components/modal/index';
import { SafeAreaView } from 'react-native-safe-area-context';

import seta from '../../assets1/seta.png'
import logo from '../../assets1/logo.png'

let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-*.#%!@?&/";

export default function GeradorDeSenha() {
  
  const [size, setSize] = useState(10);
  const [passwordValue, setPasswordValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  
  const navigation = useNavigation();

  function gerarSenha() {
    let password = "";
    for (let i = 0, n = charset.length; i < size; i++) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setPasswordValue(password);
    setModalVisible(true);
  }

  function backButtonPressed() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={backButtonPressed}>
          <Image 
            style={styles.backImage}
            source={seta}
          />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>
          Gerador de senhas
        </Text>
      </View>

      <View style={styles.containerGeral}>
        <Image 
          style={styles.logo}
          source={logo}
        />
        <Text style={styles.title}>
          {size} caracteres
        </Text>
        <View style={styles.area}>
          <Slider 
            style={styles.slider}
            minimumValue={6}
            maximumValue={20}
            minimumTrackTintColor='#1C274C'
            thumbTintColor='#3C4D88'
            value={size}
            onValueChange={(value) => setSize(value.toFixed(0))}
          />
        </View>
        <TouchableOpacity style={styles.botao} onPress={gerarSenha}>
          <Text style={styles.text}>
            gerar senha
          </Text>
        </TouchableOpacity>
        
        <Modal visible={modalVisible} animationType='fade' transparent={true}>
          <ModalPassword password={passwordValue} handleClose={() => setModalVisible(false)} />
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerGeral: {
    alignItems:'center',
    justifyContent: 'center',
    paddingTop: 180,
  },
  header: {
    flexDirection:'row',
    alignContent: 'space-between',
    gap: 10,
    backgroundColor: '#1C274C',
    paddingTop: 40,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  titleHeader: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 3,
  },
  logo: {
    marginBottom: 60,
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  slider:{
    height: 50,
  },
  area:{
    marginTop: 14,
    marginBottom: 14,
    width: '80%',
    padding: 6,
  },
  botao:{
    backgroundColor: '#1C274C',
    width: '70%',
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color: '#fff',
  },


});
