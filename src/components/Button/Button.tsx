import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useStyles } from './ButtonStyles';
import { Text } from '../Text/Text';

interface Props extends TouchableOpacityProps {
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  title?: string;
  variant?: 'outlined' | 'filled';
}

export const Button: React.FC<Props> = ({
  color = 'primary',
  title,
  style,
  children,
  variant = 'filled',
  ...props
}) => {
  const styles = useStyles({ variant, color, disabled: !!props.disabled });

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.button, style]}
      {...props}
    >
      {children ? (
        children
      ) : (
        <Text variant="button" style={styles.text}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
