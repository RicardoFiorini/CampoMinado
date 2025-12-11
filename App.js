// App.js

import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  Platform, 
  StatusBar,
  Modal, // Importar o Modal
  TouchableOpacity // Para o botão do Modal
} from 'react-native';
import { createBoard, revealCell } from './utils/gameLogic';
import Board from './components/Board';
import Header from './components/Header';

const ROWS = 10;
const COLS = 10;
const BOMBS = 15;

export default function App() {
  const [board, setBoard] = useState(() => createBoard(ROWS, COLS, BOMBS));
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [bombsLeft, setBombsLeft] = useState(BOMBS);
  
  // Estados para o Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (gameStatus === 'playing') {
      checkGameStatus();
    }
  }, [board, gameStatus]);


  const resetGame = () => {
    setBoard(createBoard(ROWS, COLS, BOMBS));
    setGameStatus('playing');
    setBombsLeft(BOMBS);
    setModalVisible(false); // Esconde o modal ao reiniciar
  };

  const handleCellClick = (r, c) => {
    if (gameStatus !== 'playing' || modalVisible) return;

    const cell = board[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    if (cell.isBomb) {
      setGameStatus('lost');
      let newBoard = JSON.parse(JSON.stringify(board));
      newBoard.forEach(row => row.forEach(cell => {
        if (cell.isBomb) cell.isRevealed = true;
      }));
      setBoard(newBoard);
      
      // *** MUDANÇA DE UX: Ativa o Modal em vez do Alert ***
      setModalMessage('Você Perdeu! 😵');
      setModalVisible(true);
    } else {
      const newBoard = revealCell(board, r, c, ROWS, COLS);
      setBoard(newBoard);
    }
  };

  const handleCellLongPress = (r, c) => {
    if (gameStatus !== 'playing' || modalVisible) return;

    let newBoard = JSON.parse(JSON.stringify(board));
    const cell = newBoard[r][c];
    if (cell.isRevealed) return;

    let bombsCount = bombsLeft;
    if (cell.isFlagged) {
      cell.isFlagged = false;
      bombsCount++;
    } else {
      if (bombsCount > 0) {
        cell.isFlagged = true;
        bombsCount--;
      }
    }
    setBombsLeft(bombsCount);
    setBoard(newBoard);
  };

  const checkGameStatus = () => {
    let cellsRevealed = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c].isRevealed && !board[r][c].isBomb) {
          cellsRevealed++;
        }
      }
    }

    const totalNonBombCells = (ROWS * COLS) - BOMBS;
    if (cellsRevealed === totalNonBombCells) {
      setGameStatus('won');
      
      // *** MUDANÇA DE UX: Ativa o Modal em vez do Alert ***
      setModalMessage('Você Venceu! 😎');
      setModalVisible(true);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.container.backgroundColor} />
      
      {/* Componente Modal para Win/Lose */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={resetGame} // Permite fechar com o botão "voltar" no Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={resetGame}>
              <Text style={styles.modalButtonText}>Jogar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <Text style={styles.title}>Campo Minado</Text>
        <Header 
          bombsLeft={bombsLeft}
          gameStatus={gameStatus}
          onReset={resetGame}
        />
        <Board
          board={board}
          onCellClick={handleCellClick}
          onCellLongPress={handleCellLongPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F7', // Fundo principal
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F4F7',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza tudo
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 20,
  },
  
  // --- Estilos do Modal ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 25,
  },
  modalButton: {
    backgroundColor: '#007AFF', // Azul primário
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});