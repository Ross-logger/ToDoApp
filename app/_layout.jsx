import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from '../api/AuthContext';
import Index from '../app/(tabs)';
import Login from './login';
import Registration from './registration';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    const { user, loading } = React.useContext(AuthContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                {user ? (
                    <Stack.Screen
                        name="Index"
                        component={Index}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Registration" component={Registration} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default function MyStack() {
    return (
        <AuthProvider>
            <AuthNavigator />
        </AuthProvider>
    );
}
