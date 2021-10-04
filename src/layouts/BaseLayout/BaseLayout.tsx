import React from 'react';
import { View } from 'react-native';
import { Modal } from '../../components/Modal';
import { useStyles } from './BaseLayoutStyles';

export const BaseLayout: React.FC = ({ children }) => {
  const style = useStyles();

  return (
    <>
      <Modal />
      <View style={style.layout}>{children}</View>
    </>
  );
};
