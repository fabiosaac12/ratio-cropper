import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useStyles } from './ButtonStyles';
import { Text } from '../Text/Text';

interface Props extends TouchableOpacityProps {
  color?: 'primary' | 'secondary';
  title?: string;
}

export const Button: React.FC<Props> = ({
  color = 'primary',
  title,
  style,
  children,
  ...props
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.button,
        styles[color],
        style,
        props.disabled && styles.disabled,
      ]}
      {...props}
    >
      {children ? children : <Text variant="button">{title}</Text>}
    </TouchableOpacity>
  );
};
