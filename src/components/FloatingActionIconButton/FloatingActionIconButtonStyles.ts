import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

interface Props {
  position: 'br' | 'bl' | 'tl' | 'tr';
  color: 'primary' | 'secondary' | 'danger' | 'success';
  variant: 'outlined' | 'filled';
  disabled: boolean;
}

export const useStyles = makeStyles(
  (theme, { position, color, variant, disabled }: Props) =>
    StyleSheet.create({
      container: {
        position: 'absolute',
        top: position.includes('t') ? theme.spacing(4) : undefined,
        bottom: position.includes('b') ? theme.spacing(4) : undefined,
        left: position.includes('l') ? theme.spacing(4) : undefined,
        right: position.includes('r') ? theme.spacing(4) : undefined,
      },
      fab: {
        width: 65,
        height: 65,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:
          variant === 'outlined'
            ? theme.palette.background[100]
            : disabled
            ? theme.palette.greys[500]
            : theme.palette[color][500],
        borderColor: disabled
          ? theme.palette.greys[500]
          : theme.palette[color][500],
        borderWidth: 2,
        ...theme.shadows[4],
      },
      icon: {
        color:
          variant === 'filled'
            ? theme.palette.text.button
            : disabled
            ? theme.palette.greys[500]
            : theme.palette[color][500],
      },
    }),
);
