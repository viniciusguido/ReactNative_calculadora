/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {useState} from 'react';
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
  }

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
      return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  };
  setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
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
              <TouchableOpacity style={styles.button} key={button}>
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
