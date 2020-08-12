import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
      displayWinner: false,
      winner: '',
      displayTie: false,
      disabled: false
    };
  }

  renderIcon = (row, column) => {
    const value = this.state.board[row][column];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case 2:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return null;
    }
  };

  getWinner = (board) => {
    const checkBoard = [...board]
    let winner;
    // horizontal winners
    if (checkBoard[0][0] === checkBoard[0][1] && 
        checkBoard[0][0] === checkBoard[0][2]) {
        winner = checkBoard[0][0]
        if (winner !== 0) {
          return winner
        }
    }
    if (checkBoard[1][0] === checkBoard[1][1] && 
        checkBoard[1][0] === checkBoard[1][2]) {
        winner = checkBoard[1][0]
        if (winner !== 0) {
          return winner
        }
    }
    if (checkBoard[2][0] === checkBoard[2][1] && 
        checkBoard[2][0] === checkBoard[2][2]) {
        winner = checkBoard[2][0]
        if (winner !== 0) {
          return winner
        }
    }
    // diagonal winners
    if (checkBoard[0][2] === checkBoard[1][1] && 
        checkBoard[0][2] === checkBoard[2][0]) {
        winner = checkBoard[0][2]
        if (winner !== 0) {
          return winner
        }
    }
    if (checkBoard[0][0] === checkBoard[1][1] && 
        checkBoard[0][0] === checkBoard[2][2]) {
        winner = checkBoard[0][0]
        if (winner !== 0) {
          return winner
        }
    }
    // vertical winners
    if (checkBoard[0][0] === checkBoard[1][0] && 
        checkBoard[0][0] === checkBoard[2][0]) {
        winner = checkBoard[0][0]
        if (winner !== 0) {
          return winner
        }
    }
    if (checkBoard[0][1] === checkBoard[1][1] && 
        checkBoard[0][1] === checkBoard[2][1]) {
        winner = checkBoard[0][1]
        if (winner !== 0) {
          return winner
        }
    }
    if (checkBoard[0][2] === checkBoard[1][2] && 
        checkBoard[0][2] === checkBoard[2][2]) {
        winner = checkBoard[0][2]
        if (winner !== 0) {
          return winner
        }
    }
  }

  checkTie = (board) => {
    let checkBoard = [...board]
    for (let row of checkBoard) {
      if (row.includes(0)) return false
    }
    return true
  }

  onTilePress = (row, column) => {
    const value = this.state.board[row][column]
    // prevent a repress on a tile
    if (value !== 0) return
    // get current player
    const {currentPlayer} = this.state
    // make a copy of the board
    const arr = [...this.state.board]
    // set tile
    arr[row][column] = currentPlayer
    const newPlayer = (this.state.currentPlayer === 1) ? 2 : 1
    this.setState({
      board: arr,
      currentPlayer: newPlayer
    })
    // check for a winner
    const result = this.getWinner(this.state.board)
    if (result !== undefined) {
      const player = (result === 1 ? 'X' : 'O') 
      this.setState({
        winner: player,
        displayWinner: true,
        disabled: true
      })
      return
    }
    // check for a tie
    const tieResult = this.checkTie(this.state.board)
    if (tieResult) {
      this.setState({
        displayTie: true,
        disabled: true
      })
    }
  }

  playAgain = () => {
    const newBoard = [[0,0,0],[0,0,0],[0,0,0]]
    this.setState({
      board: newBoard,
      currentPlayer: 1,
      displayWinner: false,
      winner: '',
      displayTie: false,
      disabled: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.currentPlayer}>
          Current Player: {this.state.currentPlayer === 1 ? 'X' : 'O'}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity 
            disabled={this.state.disabled} 
            style={styles.tile} 
            onPress={()=> this.onTilePress(0, 0)}>                  
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity 
            disabled={this.state.disabled} 
            style={styles.tile} 
            onPress={()=> this.onTilePress(0, 1)}>                  
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity 
            disabled={this.state.disabled} 
            style={styles.tile} 
            onPress={()=> this.onTilePress(0, 2)}>                  
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity 
            disabled={this.state.disabled} 
            style={styles.tile} 
            onPress={()=> this.onTilePress(1, 0)}>                  
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity 
            disabled={this.state.disabled} 
            style={styles.tile} 
            onPress={()=> this.onTilePress(1, 1)}>                  
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity 
            disabled={this.state.disabled} 
            style={styles.tile} 
            onPress={()=> this.onTilePress(1, 2)}>                  
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity 
            disabled={this.state.disabled} 
            style={styles.tile} 
            onPress={()=> this.onTilePress(2, 0)}>                  
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity 
            disabled={this.state.disabled} 
            style={styles.tile} 
            onPress={()=> this.onTilePress(2, 1)}>                  
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity 
            disabled={this.state.disabled} 
            style={styles.tile} 
            onPress={()=> this.onTilePress(2, 2)}>                  
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        {
          this.state.displayWinner ? 
          <View style={styles.winner}>
          The Winner is: {this.state.winner}
          {'\n'}
          <Button onPress={this.playAgain} title='Play Again' />
          </View> 
          : null
        }
        {
          this.state.displayTie ? 
          <View style={styles.winner}>
          Tie
          <Button onPress={this.playAgain} title='Play Again' />
          </View> 
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'monospace',
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    width: 100,
    height: 100,
  },
  tileX: {
    color: 'red',
    fontSize: 60,
  },
  tileO: {
    color: 'blue',
    fontSize: 50,
  },
  winner: {
    fontSize: 30,
    borderRadius: 5,
    position: "absolute",
    width: 200,
    height: 100,
    zIndex: 2,
    backgroundColor: 'whitesmoke',
    color: 'black',
    textAlign: 'center',
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  currentPlayer: {
    fontSize: 25,
  }
});
