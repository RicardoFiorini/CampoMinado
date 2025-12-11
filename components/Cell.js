// components/Cell.js

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// Importamos a biblioteca de ícones
import { FontAwesome } from '@expo/vector-icons'; 

export default function Cell({ 
  isRevealed, 
  isBomb, 
  isFlagged, 
  adjacentBombs, 
  onPress, 
  onLongPress 
}) {
  
  const renderContent = () => {
    if (!isRevealed) {
      // Se tiver bandeira, mostra o ícone 'flag'
      return isFlagged ? <FontAwesome name="flag" size={18} color="#FF9500" /> : null;
    }
    if (isBomb) {
      // Se for bomba, mostra o ícone 'bomb'
      return <FontAwesome name="bomb" size={18} color="#FFF" />;
    }
    if (adjacentBombs > 0) {
      // Mostra o número de bombas
      return adjacentBombs;
    }
    return null; // Célula vazia revelada
  };

  // Estilos dinâmicos
  const cellStyle = [
    styles.cell,
    isRevealed ? styles.cellRevealed : styles.cellHidden,
    isBomb && isRevealed ? styles.cellBomb : null,
  ];

  const textStyle = [
    styles.cellText,
    // Define cores diferentes para cada número
    adjacentBombs === 1 && styles.text1,
    adjacentBombs === 2 && styles.text2,
    adjacentBombs === 3 && styles.text3,
    adjacentBombs > 3 && styles.text4,
  ];

  return (
    <TouchableOpacity
      style={cellStyle}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{renderContent()}</Text>
    </TouchableOpacity>
  );
}

// Uma paleta de cores mais moderna
const colors = {
  primary: '#007AFF',     // Azul vibrante
  light: '#F0F4F7',       // Fundo revelado (muito claro)
  hidden: '#BCCCDC',    // Fundo escondido (cinza azulado)
  danger: '#FF3B30',      // Vermelho para bomba
  flag: '#FF9500',        // Laranja para bandeira
  textDark: '#1C1C1E',    // Texto escuro
};

const styles = StyleSheet.create({
  cell: {
    width: 30, // Um pouco maior para caber ícones
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // O 'margin' cria o efeito de grade, separando as células
    margin: 1.5, 
    borderRadius: 5, // Bordas arredondadas
  },
  cellHidden: {
    backgroundColor: colors.hidden,
    // Sombra para dar elevação (look de botão)
    elevation: 3, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cellRevealed: {
    backgroundColor: colors.light,
  },
  cellBomb: {
    backgroundColor: colors.danger,
  },
  cellText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.textDark,
  },
  // Cores dos números
  text1: { color: '#007AFF' }, // Azul
  text2: { color: '#34C759' }, // Verde
  text3: { color: '#FF3B30' }, // Vermelho
  text4: { color: '#5856D6' }, // Roxo
});