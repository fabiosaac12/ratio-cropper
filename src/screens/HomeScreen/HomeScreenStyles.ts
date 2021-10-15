import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    buttonsContainer: {
      alignItems: 'flex-start',
      padding: theme.spacing(1),
      paddingTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      backgroundColor: theme.palette.background[100],
      borderBottomLeftRadius: theme.radius(4),
      borderBottomRightRadius: theme.radius(4),
      ...(theme.name === 'dark' ? theme.shadows[9] : theme.shadows[4]),
    },
    horizontalContainer: {
      flexDirection: 'row',
      width: '100%',
    },
    themeButton: {
      marginLeft: 'auto',
      marginRight: theme.spacing(),
      marginTop: theme.spacing(),
    },
    button: {
      paddingHorizontal: 12,
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
