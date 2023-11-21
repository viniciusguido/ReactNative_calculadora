/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';
import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
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
    if (buttonPressed === 'DEL') {
      const numeroAtual = currentNumber.substring(0, currentNumber.length - 1);
      setCurrentNumber(numeroAtual);
      return;
    }
    if (buttonPressed === '=') {
      setLastNumber(currentNumber + '=');
      calculator();
      return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  };

  useEffect(() => {}, [currentNumber]);

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
            <FlatList
              data={buttons}
              keyExtractor={(item: string) => item}
              numColumns={4}
              renderItem={(buttonText: any) => (
                <View>
                  {buttonText === '=' ? (
                    <Button
                      mode="elevated"
                      onPress={() => handleInput(buttonText)}>
                      <Text style={styles.textButton}> {buttonText}</Text>
                    </Button>
                  ) : (
                    <Button
                      mode="elevated"
                      style={styles.button}
                      onPress={() => handleInput(buttonText)}>
                      <Text style={styles.textButton}> {buttonText}</Text>
                    </Button>
                  )}
                </View>
              )}
            />
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
    margin: 6,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  textButton: {
    color: '#5b5b5b',
    fontSize: 18,
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
