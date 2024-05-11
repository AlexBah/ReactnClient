import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [text, onChangeText] = useState("http://31.43.203.115:8000/");
  const [textStatus, setTextStatus] = useState("-");
  const [textHeaders, setTextHeaders] = useState("-");
  const [textBody, setTextBody] = useState("-");

  var getResponse = () => {
    fetch(text)
    .then(
      response => {
      setTextStatus(response.status);
      setTextHeaders(response.headers);
      return response.text();
    })
    .then(result => setTextBody(result))
    .catch(error => setTextBody(error))
  }

  return (
    <View style={styles.container}>
      <View style={styles.request}>
        <View style={styles.small}>
          <TextInput 
            style={styles.text}
            onChangeText={onChangeText}
            value={text}
          />
          <Button title="Get" onPress={getResponse}/>
        </View>
      </View>
      <ScrollView onLoad={getResponse} style={styles.response}>
        <Text style={styles.status}>{textStatus}</Text>
        <Text style={styles.headers}>{textHeaders}</Text>
        <Text style={styles.body}>{textBody}</Text>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  small: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  request: {
    height: 100,
    backgroundColor: '#222',
    borderWidth: 3,
    borderRadius: 5,
    margin: 2,
    borderColor: '#242',
    alignItems: 'stretch',
  },
  response: {
    flex: 1,
    backgroundColor: '#222',
    borderWidth: 3,
    borderRadius: 5,
    margin: 2,
    borderColor: '#242',
  },
  text: {
    fontSize: 20,
    color: '#eee',
  },
  status: {
    fontSize: 20,
    color: '#0e0',
  },
  headers: {
    fontSize: 20,
    color: '#e0e',
  },
  body: {
    fontSize: 20,
    color: '#0e0',
  },

});
