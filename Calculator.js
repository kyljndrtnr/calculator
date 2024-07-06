import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);

  const handlePress = (value) => {
    if (value === 'C') {
      setDisplay('0');
      setFirstOperand(null);
      setOperator(null);
    } else if (['+', '-', 'x', '÷'].includes(value)) {
      setFirstOperand(parseFloat(display));
      setOperator(value);
      setDisplay('0');
    } else if (value === '=') {
      if (operator && firstOperand !== null) {
        const secondOperand = parseFloat(display);
        let result;
        switch (operator) {
          case '+':
            result = firstOperand + secondOperand;
            break;
          case '-':
            result = firstOperand - secondOperand;
            break;
          case 'x':
            result = firstOperand * secondOperand;
            break;
          case '÷':
            result = firstOperand / secondOperand;
            break;
        }
        setDisplay(result.toString());
        setFirstOperand(null);
        setOperator(null);
      }
    } else {
      if (display === '0') {
        setDisplay(value);
      } else {
        setDisplay(display + value);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display}</Text>
      <View style={styles.buttonRow}>
        {['7', '8', '9', '÷'].map((value) => (
          <CalculatorButton key={value} value={value} onPress={handlePress} />
        ))}
      </View>
      <View style={styles.buttonRow}>
        {['4', '5', '6', 'x'].map((value) => (
          <CalculatorButton key={value} value={value} onPress={handlePress} />
        ))}
      </View>
      <View style={styles.buttonRow}>
        {['1', '2', '3', '-'].map((value) => (
          <CalculatorButton key={value} value={value} onPress={handlePress} />
        ))}
      </View>
      <View style={styles.buttonRow}>
        {['0', '+', '=', 'C'].map((value) => (
          <CalculatorButton key={value} value={value} onPress={handlePress} />
        ))}
      </View>
    </View>
  );
};

const CalculatorButton = ({ value, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(value)}>
      <Text style={[styles.buttonText, value === 'C' || value === '=' ? styles.specialButtonText : null]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
  },
  display: {
    fontSize: 48,
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    textAlign: 'right',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 5,
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
  specialButtonText: {
    color: '#ffa500',
  },
});

export default Calculator;
