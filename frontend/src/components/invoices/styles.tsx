import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({

  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },

	header: {
		fontFamily: 'Poppins',
		fontSize: 100
	},
	black: {
		color: '#000'
	},
	th: {
		fontSize: '8px',
		textAlign: 'center'
	},
	td: {
		fontSize: '8px',
		textAlign: 'center'
	}
});