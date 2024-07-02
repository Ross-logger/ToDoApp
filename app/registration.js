import React, {useContext} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator,} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword,} from "firebase/auth";
import {FIREBASE_AUTH} from "../api/FirebaseConfig";
import {AuthContext} from '../api/AuthContext';

const Registration = () => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const auth = FIREBASE_AUTH;
    const {setUser} = useContext(AuthContext);

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };


    const register = async () => {
        setIsLoading(true);
        if (!validateEmail(email)) {
            return alert('Wrong email');
        } else if (!(password.length >= 6 && password2.length >= 6)) {
            return alert('Password must contain at least 6 characters');
        } else if (password !== password2) {
            return alert('Passwords do not match');
        }
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            setUser(response.user);
            console.log(response.user);
            navigation.replace('(tabs)');
        } catch (err) {
            switch (err.code) {
                case 'auth/email-already-in-use':
                    alert('The email address is already in use.');
                    break;
                case 'auth/invalid-email':
                    alert('The email address is not valid.');
                    break;
                case 'auth/operation-not-allowed':
                    alert('Email/password accounts are not enabled.');
                    break;
                case 'auth/weak-password':
                    alert('The password is too weak.');
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
            <Text style={styles.title}>Registration Page</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                fontSize={18}
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
            <TextInput
                style={styles.input}
                placeholder="Repeat your password"
                placeholderTextColor="#999"
                value={password2}
                onChangeText={setPassword2}
                secureTextEntry
                fontSize={18}
            />
            {isLoading ?
                (<ActivityIndicator size="large"></ActivityIndicator>)
                :
                (<Pressable style={styles.button} onPress={register}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>)
            }
            <View style={styles.alreadyHave}>
                <Text style={styles.alreadyText}>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate('login')}>
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
        fontSize: 18,
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

export default Registration;
