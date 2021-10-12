import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    buttonsContainer: {
      alignItems: 'flex-start',
      padding: theme.spacing(1),
      paddingTop: theme.spacing(5),
      marginBottom: theme.spacing(3),
      backgroundColor: theme.palette.background[200],
      borderBottomLeftRadius: theme.radius(4),
      borderBottomRightRadius: theme.radius(4),
      ...theme.shadows[3],
    },
    themeButton: {
      position: 'absolute',
      right: theme.spacing(5),
      top: theme.spacing(5.25),
    },
    button: {
      paddingHorizontal: 20,
    },
    buttonIcon: {
      marginRight: 8,
      color: theme.palette.text.button,
    },
    albumTabsContainer: {
      backgroundColor: theme.palette.background[100],
      paddingVertical: theme.spacing(2),
    },
  }),
);
