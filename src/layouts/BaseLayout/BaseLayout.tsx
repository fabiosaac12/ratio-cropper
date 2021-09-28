import React from 'react';
import { View } from 'react-native';
import { useStyles } from './BaseLayoutStyles';

export const BaseLayout: React.FC = ({ children }) => {
  const style = useStyles();

  return <View style={style.layout}>{children}</View>;
};
