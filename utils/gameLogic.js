// utils/gameLogic.js

/**
 * Cria um tabuleiro de jogo vazio
 * @param {number} rows - Número de linhas
 * @param {number} cols - Número de colunas
 * @returns {Array<Array<Object>>} - O tabuleiro
 */
function createEmptyBoard(rows, cols) {
  let board = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        r: r,
        c: c,
        isBomb: false,
        isRevealed: false,
        isFlagged: false,
        adjacentBombs: 0,
      });
    }
    board.push(row);
  }
  return board;
}

/**
 * Espalha as bombas aleatoriamente no tabuleiro
 * @param {Array<Array<Object>>} board - O tabuleiro
 * @param {number} bombs - Número de bombas
 */
function plantBombs(board, bombs, rows, cols) {
  let bombsPlanted = 0;
  while (bombsPlanted < bombs) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);

    if (!board[r][c].isBomb) {
      board[r][c].isBomb = true;
      bombsPlanted++;
    }
  }
  return board;
}

/**
 * Calcula o número de bombas adjacentes para cada célula
 * @param {Array<Array<Object>>} board - O tabuleiro
 */
function calculateAdjacentBombs(board, rows, cols) {
  // Helpers para checar 8 direções (vizinhos)
  const directions = [
    [-1, -1], [-1, 0], [-1, 1], // Acima
    [0, -1], [0, 1],           // Lados
    [1, -1], [1, 0], [1, 1]    // Abaixo
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isBomb) {
        continue;
      }

      let count = 0;
      for (let dir of directions) {
        const newR = r + dir[0];
        const newC = c + dir[1];

        // Verifica se o vizinho está dentro do tabuleiro
        if (newR >= 0 && newR < rows && newC >= 0 && newC < cols) {
          if (board[newR][newC].isBomb) {
            count++;
          }
        }
      }
      board[r][c].adjacentBombs = count;
    }
  }
  return board;
}

/**
 * Função principal que cria um novo tabuleiro de jogo
 */
export const createBoard = (rows, cols, bombs) => {
  let board = createEmptyBoard(rows, cols);
  board = plantBombs(board, bombs, rows, cols);
  board = calculateAdjacentBombs(board, rows, cols);
  return board;
};

/**
 * Lógica para revelar uma célula (e seus vizinhos, se for o caso - "flood fill")
 * Retorna um NOVO array de tabuleiro para atualizar o estado
 */
export const revealCell = (board, r, c, rows, cols) => {
  // Cria uma cópia profunda do tabuleiro para não modificar o estado original
  let newBoard = JSON.parse(JSON.stringify(board));

  // 1. Casos base para parar a recursão
  // Fora do tabuleiro
  if (r < 0 || r >= rows || c < 0 || c >= cols) return newBoard;
  // Já revelada
  if (newBoard[r][c].isRevealed) return newBoard;
  // Com bandeira
  if (newBoard[r][c].isFlagged) return newBoard;

  // 2. Revela a célula
  newBoard[r][c].isRevealed = true;

  // 3. Se for uma bomba, fim de jogo (não precisa fazer mais nada aqui)
  if (newBoard[r][c].isBomb) {
    return newBoard;
  }

  // 4. Se for 0, revela os vizinhos (recursão)
  if (newBoard[r][c].adjacentBombs === 0) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    
    for (let dir of directions) {
      // Importante: a recursão deve usar o 'newBoard' que está sendo modificado
      newBoard = revealCell(newBoard, r + dir[0], c + dir[1], rows, cols);
    }
  }
  
  return newBoard;
};