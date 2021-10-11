import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

type Props = {
  color: 'primary' | 'secondary' | 'danger' | 'success';
  variant: 'outlined' | 'filled';
  disabled?: boolean;
};

export const useStyles = makeStyles(
  (theme, { variant, color, disabled }: Props) =>
    StyleSheet.create({
      button: {
        padding: theme.spacing(1.3),
        borderRadius: theme.radius(5),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing(),
        ...(variant === 'filled' ? theme.shadows[2] : {}),
        backgroundColor:
          variant === 'filled'
            ? disabled
              ? theme.palette.greys[500]
              : theme.palette[color][500]
            : '#00000000',
        borderColor: disabled
          ? theme.palette.greys[500]
          : theme.palette[color][500],
        borderWidth: 2,
      },
      text: {
        color:
          variant === 'filled'
            ? theme.palette.text.button
            : theme.palette[color][500],
      },
    }),
);
