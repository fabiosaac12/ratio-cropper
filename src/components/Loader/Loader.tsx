import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { useLoader } from '../../providers/Loader';
import { useTheme } from '../../providers/Theme';
import { useStyles } from './LoaderStyles';

export const Loader = () => {
  const { theme } = useTheme();
  const { visible } = useLoader();
  const styles = useStyles();

  return (
    <Modal
      statusBarTranslucent
      hardwareAccelerated
      renderToHardwareTextureAndroid
      animationType="fade"
      transparent
      visible={visible}
    >
      <View style={styles.backdrop}>
        <ActivityIndicator size="large" color={theme.palette.primary[500]} />
      </View>
    </Modal>
  );
};
