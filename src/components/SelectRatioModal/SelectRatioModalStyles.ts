import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: theme.spacing(3),
    },
    section: {
      paddingHorizontal: theme.spacing(3),
    },
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
          : theme.palette.primary[700],
    },
    secondaryTextColor: {
      color:
        theme.name === 'dark'
          ? theme.palette.secondary[200]
          : theme.palette.secondary[700],
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
