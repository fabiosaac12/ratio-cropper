import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

interface Props {
  variant: 'primary' | 'secondary' | 'danger' | 'success';
}

export const useStyles = makeStyles((theme, { variant }: Props) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing(3),
    },
    title: {
      textAlign: 'center',
      color:
        theme.name === 'light'
          ? theme.palette[variant][800]
          : theme.palette[variant][200],
      marginBottom: 15,
    },
  }),
);
