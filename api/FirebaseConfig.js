import {initializeApp} from "firebase/app";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyCzgik6zHwTQBhYlp8Kgad7vV7v27DyTu8",
    authDomain: "todomobileapp-e6c11.firebaseapp.com",
    projectId: "todomobileapp-e6c11",
    storageBucket: "todomobileapp-e6c11.appspot.com",
    messagingSenderId: "684697841838",
    appId: "1:684697841838:web:9f5ab037f4a0bb63cf3d3f"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);