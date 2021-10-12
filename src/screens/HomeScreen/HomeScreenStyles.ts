import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    buttonsContainer: {
      alignItems: 'flex-start',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(3),
      backgroundColor: theme.palette.background[100],
      borderBottomLeftRadius: theme.radius(4),
      borderBottomRightRadius: theme.radius(4),
      ...theme.shadows[3],
    },
    themeButton: {
      marginLeft: 'auto',
      marginRight: theme.spacing(),
    },
    button: {
      paddingHorizontal: 20,
    },
    buttonIcon: {
      marginRight: 8,
      color: theme.palette.text.button,
    },
  }),
);
