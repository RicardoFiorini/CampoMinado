# Campo Minado Mobile
Uma recriação fiel e moderna do clássico jogo **Campo Minado**, desenvolvida com *React Native*. O foco do projeto foi implementar a lógica matemática por trás do tabuleiro e garantir uma jogabilidade fluida em telas de toque.
## Funcionalidades do Jogo

- Geração dinâmica de tabuleiros com diferentes níveis de dificuldade.
- Lógica de detecção de minas adjacentes.
- Sistema de bandeiras para marcar possíveis perigos (Long Press).
- Algoritmo de expansão automática ao clicar em campos vazios.

## Status de Desenvolvimento
- [x] Lógica de criação da matriz do jogo
- [x] Renderização de componentes visuais (Campos/Minas)
- [x] Sistema de vitória e derrota
- [x] Seleção de dificuldade
- [ ] Implementação de placar de melhores tempos
## Tecnologias Utilizadas
| Tecnologia | Finalidade |
| --- | --- |
| React Native | Desenvolvimento da interface e lógica cross-platform |
| JavaScript | Algoritmos de manipulação de matrizes |
| Expo | Workflow de desenvolvimento e testes |
| StyleSheet | Estilização da grade e componentes |
> [!TIP]
> Toque rápido para abrir um campo e segure (long press) para colocar ou remover uma bandeira de sinalização.
## Instalação
Após clonar o repositório, instale as dependências:
`npm install`
Inicie o projeto com o Expo:
```bash

npx expo start

```
