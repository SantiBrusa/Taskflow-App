import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>TaskFlow</Text>
      <Text style={styles.txtSubTitle}>Checkpoint 1: Estructura Base</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#016d64',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    color: '#fa8050',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  txtSubTitle: {
    color: '#ffffff',
    fontSize: 16,
  }
});
