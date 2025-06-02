import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const emptyBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

function checkWinner(board) {
    // Rows, columns, diagonals
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] &&
            board[i][0] === board[i][1] &&
            board[i][1] === board[i][2]
        ) return board[i][0];
        if (
            board[0][i] &&
            board[0][i] === board[1][i] &&
            board[1][i] === board[2][i]
        ) return board[0][i];
    }
    if (
        board[0][0] &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]
    ) return board[0][0];
    if (
        board[0][2] &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]
    ) return board[0][2];
    return null;
}

export default function TicTacToe() {
    const [board, setBoard] = useState(emptyBoard);
    const [xIsNext, setXIsNext] = useState(true);
    const winner = checkWinner(board);

    function handlePress(row, col) {
        if (board[row][col] || winner) return;
        const newBoard = board.map(arr => arr.slice());
        newBoard[row][col] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    }

    function handleReset() {
        setBoard([
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]);
        setXIsNext(true);
    }

    const isDraw = !winner && board.flat().every(cell => cell);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tic Tac Toe</Text>
            <View style={styles.board}>
                {board.map((row, i) => (
                    <View key={i} style={styles.row}>
                        {row.map((cell, j) => (
                            <TouchableOpacity
                                key={j}
                                style={styles.cell}
                                onPress={( ) => handlePress(i, j)}
                            >
                                <Text style={styles.cellText}>{cell}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
            <Text style={styles.status}>
                {winner
                    ? `Winner: ${winner}`
                    : isDraw
                        ? 'Draw!'
                        : `Next: ${xIsNext ? 'X' : 'O'}`}
            </Text>
            {(winner || isDraw) && (
                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                    <Text style={styles.resetText}>Restart</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginTop: 60 },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
    board: {},
    row: { flexDirection: 'row' },
    cell: {
        width: 80,
        height: 80,
        borderWidth: 2,
        borderColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        backgroundColor: '#fafafa',
    },
    cellText: { fontSize: 40, fontWeight: 'bold' },
    status: { fontSize: 24, marginTop: 20 },
    resetButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 6,
    },
    resetText: { color: '#fff', fontSize: 18 },
});