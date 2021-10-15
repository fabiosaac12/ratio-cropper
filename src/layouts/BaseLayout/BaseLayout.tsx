import React from 'react';
import { View } from 'react-native';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { useStyles } from './BaseLayoutStyles';

export const BaseLayout: React.FC = ({ children }) => {
  const style = useStyles();

  return (
    <>
      <Modal />
      <Loader />
      <View style={style.layout}>{children}</View>
    </>
  );
};
