import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../../components/Button';
import { MainStackNavigatorParamas } from '../../../navigation/MainStackNavigator';
import { useImageHandler } from '../../../providers/ImageHandler';
import { Ratio } from '../../../providers/ImageHandler/models/Ratio';
import { useModal } from '../../../providers/Modal';

export const SelectRatioModal = () => {
  const modal = useModal();
  const { setRatio } = useImageHandler();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackNavigatorParamas>>();

  const handleSetRatio = (ratio: Ratio) => {
    modal.handleHide();
    setRatio(ratio);
    navigation.navigate('cropImage');
  };

  return (
    <>
      <Button title="16:9" onPress={() => handleSetRatio([16, 9])} />
      <Button title="19:9" onPress={() => handleSetRatio([19, 9])} />
      <Button title="12:5" onPress={() => handleSetRatio([12, 5])} />
      <Button title="4:3" onPress={() => handleSetRatio([4, 3])} />
      <Button title="1:1" onPress={() => handleSetRatio([1, 1])} />
    </>
  );
};
