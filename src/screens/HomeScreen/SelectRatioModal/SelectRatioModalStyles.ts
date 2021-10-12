import { StyleSheet } from 'react-native';
import { makeStyles } from '../../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    ratiosContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    },
    title: {
      marginLeft: 12,
      marginBottom: 10,
      marginTop: 20,
      fontWeight: '500',
      fontSize: 20,
      textTransform: 'uppercase',
      color:
        theme.name === 'dark'
          ? theme.palette.primary[200]
          : theme.palette.primary[800],
    },
    ratio: {
      paddingHorizontal: 14,
    },
    ratioIcon: {
      marginRight: 8,
      color: theme.palette.text.button,
    },
  }),
);
