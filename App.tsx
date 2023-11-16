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
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

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
    '+/-',
    '=',
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
    if (buttonPressed === '+/-') {
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
    // isso aqui limita o quanto vai atualizar o current number, para no máximo 20 caracteres
    // length representa o tamanho do texto presente dentro do currentNumber
    if (currentNumber.length > 0 && currentNumber.length < 20) {
      // Esse trecho cuida da atualização dos números em tempo real, evitando aquele erro de loop infinito, porque se der algum erro, então esse trecho trata o erro (na maioria dos casos)
      setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
    }

    // a linha de baixo, atualiza o currentNumber sempre que ele sofrer alguma alteração
  }, [currentNumber]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.title}>Calculadora</Text>
        </View>
        <View style={styles.results}>
          <Text style={styles.historyText}>{lastNumber}</Text>
          <Text style={styles.resultText}>{currentNumber}</Text>
        </View>
        <View style={styles.buttons}>
          {buttons.map(button => {
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  results: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: 300,
    backgroundColor: 'cyan',
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
    minHeight: 80,
    minWidth: 80,
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
