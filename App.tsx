/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const buttons = [
    'AC',
    'DEL',
    '%',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '3',
    '2',
    '1',
    '+',
    '0',
    '.',
    '',
    '=',
  ];

  const calc_buttons = [
    ['AC', 'DEL', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['3', '2', '1', '+'],
    ['0', '.', '', '='],
  ];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const calculator = () => {
    const splitNumbers = currentNumber.split(' ');
    const operator = splitNumbers[1];
    console.log(splitNumbers);

    if (operator === '*') {
      setCurrentNumber(
        (parseFloat(splitNumbers[0]) * parseFloat(splitNumbers[2])).toString(),
      );
    }
    if (operator === '/') {
      setCurrentNumber(
        (parseFloat(splitNumbers[0]) / parseFloat(splitNumbers[2])).toString(),
      );
    }
    if (operator === '+') {
      setCurrentNumber(
        (parseFloat(splitNumbers[0]) + parseFloat(splitNumbers[2])).toString(),
      );
    }
    if (operator === '-') {
      setCurrentNumber(
        (parseFloat(splitNumbers[0]) - parseFloat(splitNumbers[2])).toString(),
      );
    }
  };

  const handleInput = (buttonPressed: string) => {
    if (
      buttonPressed === '*' ||
      buttonPressed === '/' ||
      buttonPressed === '+' ||
      buttonPressed === '-'
    ) {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
      return;
    }
    if (buttonPressed === '.') {
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    }
    if (buttonPressed === 'AC') {
      setLastNumber('');
      setCurrentNumber('');
      return;
    }
    if (buttonPressed === '=') {
      setLastNumber(currentNumber + '=');
      // Para calcular, é preciso chamar a função calculator após clicar no butão '='
      calculator();
      return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  };

  useEffect(() => {
    // a linha de baixo, atualiza o currentNumber sempre que ele sofrer alguma alteração
  }, [currentNumber]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Calculadora</Text>
        </View>

        <View style={styles.results}>
          <Text style={styles.historyText}>{lastNumber}</Text>
          <Text style={styles.resultText}>{currentNumber}</Text>
        </View>
        <View style={styles.button_container}>
          <View style={styles.buttons}>
            {buttons.map((button: string) => {
              // Esse trecho não vai rodar
              if (button === '=') {
                // É preciso tratar o button = de uma forma um pouco diferente
                return (
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: '#ffbf60',
                        borderRadius: 50,
                      },
                    ]}
                    key={button}
                    onPress={() => handleInput(button)}>
                    <Text style={styles.textButton}> {button}</Text>
                  </TouchableOpacity>
                );
              }
              // o handle input é chamado sempre que um botão é clicado com o onPress
              // para deixar os botões dinâmicos, é preciso passar a variável button no input
              // Só esse trecho vai rodarr
              return (
                <TouchableOpacity
                  style={styles.button}
                  key={button}
                  onPress={() => handleInput(button)}>
                  <Text style={styles.textButton}> {button}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  results: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: windowHeight / 2.5,
    backgroundColor: 'cyan',
  },
  button_container: {
    width: windowWidth,
    height: windowHeight,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    minWidth: windowWidth / 4,
    minHeight: windowHeight / 9,
  },
  textButton: {
    color: '#5b5b5b',
    fontSize: 25,
    textAlign: 'center',
  },
  resultText: {
    fontWeight: '100',
    fontSize: 80,
    margin: 10,
    alignSelf: 'flex-end',
  },
  historyText: {
    fontSize: 22,
    marginBottom: 0,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
});

export default App;
