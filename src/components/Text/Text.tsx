import React from 'react';
import { Text as TextRN, TextProps } from 'react-native';
import { useStyles } from './TextStyles';

interface Props extends TextProps {
  variant?:
    | 'title'
    | 'title2'
    | 'subtitle'
    | 'subtitle2'
    | 'body'
    | 'body2'
    | 'button';
}

export const Text: React.FC<Props> = ({
  children,
  variant = 'body',
  style,
  ...props
}) => {
  const styles = useStyles();

  return (
    <TextRN style={[styles[variant], style]} {...props}>
      {children}
    </TextRN>
  );
};
