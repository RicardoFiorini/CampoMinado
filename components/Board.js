// components/Board.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

export default function Board({ board, onCellClick, onCellLongPress }) {
  return (
    <View style={styles.boardContainer}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              {...cell} 
              onPress={() => onCellClick(rowIndex, colIndex)}
              onLongPress={() => onCellLongPress(rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    // O fundo do tabuleiro agora é o que dá a cor das "linhas" da grade
    backgroundColor: '#8E9EAB', // Um cinza-azulado mais escuro
    padding: 5,
    borderRadius: 10,
    // Sombra no tabuleiro todo
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
  },
});