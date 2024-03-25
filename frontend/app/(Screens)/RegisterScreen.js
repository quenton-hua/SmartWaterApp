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
import { BACKEND_API_URL } from "../constants.js";

const RegisterScreen = ({ setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const handleRegister = () => {
    console.log('Register with:', email, password);
    setErrorMessage('');

    const registerEndpoint = "https://udrink-app.onrender.com/add_user"

    const requestData = {
      username: email,
      password: password,
    };

    const API_HEADERS = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json'
    };

    fetch(registerEndpoint, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data:', data); 
        if (data && data.message === "User added successfully.") {
          console.log('User added successfully.');
          setCurrentUser(requestData.username);
          // navigation.navigate('MyGoalScreen');
        } else if (data.error && data.error === "Username and password are required.") {
          console.log('User and password are required');
          setErrorMessage('Username and password are required.');
        } else if(data && data.error === "Username already exists.") {
          console.log('Username already exists.');
          setErrorMessage('Username already exists.');
        } else {
          console.log('Registration failed');
          setErrorMessage('Error during registration. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Error during registration. Please try again.');
      });



  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.registerForm}>
        <Text style={styles.heading}>Register</Text>
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
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginLink} onPress={handleLogin}>
          <Text style={styles.registerText}>Have an account? Login</Text>
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
  registerForm: {
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
  registerSwitch: {
    textAlign: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: '#0056b3',
    textDecorationLine: 'underline',
    marginTop: 15,
  },
  errorMessage: {
    color: 'red',
    marginTop: 8,
  },
});

export default RegisterScreen;
