import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '80%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
   },
   label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
        marginTop: 20,
   },
   inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '80%'
  },
  input: {
    flex: 1,
    marginLeft: 10
  },
  listbtn: {
     flexDirection: 'row', justifyContent: 'center' 
  }
});

export default styles