import React from 'react';
import { SafeAreaView } from 'react-native';
import TicTacToe from '../TicTacToe'; // adjust path if in components/

export default function App() {
    return (
        <SafeAreaView>
            <TicTacToe />
        </SafeAreaView>
    );
}