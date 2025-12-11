// components/Header.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Usar ícone de bandeira

export default function Header({ bombsLeft, gameStatus, onReset }) {
  
  const getSmiley = () => {
    if (gameStatus === 'won') return '😎';
    if (gameStatus === 'lost') return '😵';
    return '🙂';
  };

  return (
    <View style={styles.headerContainer}>
      {/* Box de Bandeiras */}
      <View style={styles.statBox}>
        <FontAwesome name="flag" size={24} color="#FF9500" />
        <Text style={styles.statText}>{bombsLeft}</Text>
      </View>
      
      {/* Botão de Reset */}
      <TouchableOpacity onPress={onReset} style={styles.resetButton}>
        <Text style={styles.smiley}>{getSmiley()}</Text>
      </TouchableOpacity>
      
      {/* Box de Tempo (ainda estático) */}
      <View style={styles.statBox}>
        <FontAwesome name="clock-o" size={24} color="#007AFF" />
        <Text style={styles.statText}>0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF', // Fundo branco
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '95%',
    borderRadius: 15,
    // Sombra do card
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 30, // Mais espaço
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F7', // Fundo leve
    padding: 10,
    borderRadius: 10,
    minWidth: 80,
    justifyContent: 'center',
  },
  statText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginLeft: 10,
  },
  resetButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F0F4F7',
  },
  smiley: {
    fontSize: 30,
  },
});