import React, {useState} from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [urlFetch, setUrlFetch] = useState("http://31.43.203.115:8000/");
  const [textStatus, setTextStatus] = useState("-");
  const [textHeaders, setTextHeaders] = useState("-");
  const [textBody, setTextBody] = useState("-");

  let getResponse = () => {
    setTextStatus("-");
    setTextHeaders("-");
    setTextBody("-");
    fetch(urlFetch)
    .then(response => {
      setTextStatus(response.status);
      let headersString = "";
      response.headers.forEach((value, key) => {
        headersString = headersString + key + " : " + value + "\n"
      });
      setTextHeaders(headersString);
      return response.text();
    })
    .then(result => setTextBody(result))
    .catch(error => setTextBody(toString(error)));
  };

  return (
    <View style={styles.container}>
      <View style={styles.request}>
          <TextInput 
            style={styles.textInput}
            onChangeText={value => setUrlFetch(value)}
            value={urlFetch}
          />
          <Button title="Get" onPress={getResponse}/>
      </View>
      <ScrollView style={styles.response}>
        <Text style={styles.textStatus}>{textStatus}</Text>
        <Text style={styles.textHeaders}>{textHeaders}</Text>
        <Text style={styles.textBody}>{textBody}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#000',
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
  textInput: {
    flex: 1,
    fontSize: 20,
    color: '#eee',
  },
  textStatus: {
    fontSize: 20,
    color: '#0e0',
  },
  textHeaders: {
    fontSize: 20,
    color: '#e0e',
  },
  textBody: {
    fontSize: 20,
    color: '#0e0',
  },
});
