import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from "../constants.js";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = () => {
    console.log('Login with:', email, password);

    const loginEndpoint = BACKEND_URL + "/login"
    const requestData = {
      username: email, 
      password: password,
    };

    const API_HEADERS = {
        'Content-Type': 'application/json',
      };

    fetch(loginEndpoint, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response:', data);
        // Handle response data as needed
        // For example, store user data in AsyncStorage or Redux state
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error cases
      });

  };

  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginForm}>
        <Text style={styles.heading}>Login</Text>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerLink} onPress={handleRegister}>
          <Text style={styles.registerText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  loginForm: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '80%',
    maxWidth: 400,
  },
  heading: {
    marginBottom: 20,
    color: '#333',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginSwitch: {
    textAlign: 'center',
    marginTop: 20,
  },
  registerLink: {
    color: '#0056b3',
    textDecorationLine: 'underline',
    marginTop: 15
  },
});

export default LoginScreen;
