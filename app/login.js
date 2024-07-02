import React, {useContext} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPassword} from "firebase/auth";
import {FIREBASE_AUTH} from "../api/FirebaseConfig";
import {AuthContext} from '../api/AuthContext';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const auth = FIREBASE_AUTH;
    const {setUser} = useContext(AuthContext);


    const login = async () => {
        setIsLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            setUser(response.user);
            console.log(response.user);
            navigation.replace('(tabs)');
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    alert('Invalid email address format.');
                    break;
                case 'auth/user-disabled':
                    alert('This user account has been disabled.');
                    break;
                case 'auth/invalid-credential':
                    alert('Invalid credentials.');
                    break;
                default:
                    alert('An unknown error occurred. Please try again.');
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                fontSize={18} // Adjusted font size here
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                fontSize={18}
            />
            {isLoading ?
                (<ActivityIndicator size="large"></ActivityIndicator>) :
                <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            }
            <View style={styles.alreadyHave}>
                <Text style={styles.alreadyText}>Don't have an account?</Text>
                <Pressable onPress={() => navigation.navigate('registration')}>
                    <Text style={styles.loginLink}>Click here.</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        color: '#333',
        fontSize: 18, // Default font size for input text
    },
    button: {
        height: 50,
        width: '100%',
        backgroundColor: '#1E90FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    alreadyHave: {
        flexDirection: 'row',
        marginTop: 20,
    },
    alreadyText: {
        fontSize: 16,
    },
    loginLink: {
        color: '#1E90FF',
        fontSize: 16,
        marginLeft: 5,
    },
});

export default Login;
