import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TextInput} from 'react-native-gesture-handler';
import {User} from '../interface/user.interface';

const LoginScreen = ({route, navigation}: {route: any; navigation: any}) => {
  const [userInput, setUserInput] = React.useState<User | null>(null);

  const handleChange = (e: any) => {
    console.log('e', e);
  };
  console.log('userInput', userInput);
  return (
    <View style={styles.container}>
      <View style={styles.boxTop}>
        <Text></Text>
      </View>
      <View style={styles.boxContent}>
      <Text style={styles.textSub}>Bạn cần đăng nhập</Text>

        <TextInput
          style={styles.input}
          onChange={e => handleChange(e)}
          value={userInput?.userName}
          placeholder="Vui lòng nhập Email"
          placeholderTextColor="white"
        />
        <TextInput
          style={styles.input}
          onChange={e => handleChange(e)}
          value={userInput?.userName}
          placeholder="Vui lòng nhập mật khẩu"
          placeholderTextColor="white"
          keyboardType="default"
        />
        <Text style={styles.textGreen}>Quên mật khẩu</Text>

        <TouchableOpacity style={styles.btnLogin}>
          <Text style={styles.text}> Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.textSub}>Hoặc bạn chưa có tài khoản?</Text>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.text}> Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  //common
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    height: height,
  },
  boxTop: {
    backgroundColor: '#3fa326dc',
    height: 70,
  },
  boxContent: {
    marginTop: 20,
    paddingHorizontal: 10,
    flex: 1,
    gap: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    borderRadius: 5,
    color: 'white',
  },
  btnLogin: {
    backgroundColor: '#52f52ac0',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 5,
  },
  btnRegister: {
    backgroundColor: 'black',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    fontSize: 16,
    color: 'white',
    paddingVertical: 10,
    fontWeight: '500',
  },
  textGreen: {
    fontSize: 14,
    color: '#3fa326dc',
    textAlign: 'right',
  },
  textSub: {
    fontSize: 14,
    color: '#9d9e9dc0',
    textAlign: 'center',
  },
});

export default LoginScreen;
