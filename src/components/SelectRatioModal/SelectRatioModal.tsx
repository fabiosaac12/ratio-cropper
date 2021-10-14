import React from 'react';
import { Button } from '../Button';
import { navigationContainerRef } from '../../navigation/MainStackNavigator';
import { useImageHandler } from '../../providers/ImageHandler';
import { Ratio } from '../../providers/ImageHandler/models/Ratio';
import { useModal } from '../../providers/Modal';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { useStyles } from './SelectRatioModalStyles';
import { defaultRatios } from './helpers';
import { Text } from '../Text';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomRatioPicker } from './CustomRatioPicker';
import { simplifyRatio } from '../../helpers/simplifyRatio';

const screen = Dimensions.get('screen');

const screenRatio: Ratio = simplifyRatio([screen.height, screen.width]);

export const SelectRatioModal = () => {
  const styles = useStyles();
  const modal = useModal();
  const { setRatio, recentlyUsedRatiosRef } = useImageHandler();

  const handleSetRatio = (ratio: Ratio) => {
    modal.handleHide();
    setRatio(ratio);
    navigationContainerRef.navigate('cropImage');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity activeOpacity={1} style={styles.container}>
        <CustomRatioPicker handleSetRatio={handleSetRatio} />

        <Text style={styles.title}>Your Phone Screen Ratio</Text>
        <View style={styles.ratiosContainer}>
          <Button
            style={styles.ratio}
            onPress={() => handleSetRatio(screenRatio)}
            title={`${screenRatio[0]} : ${screenRatio[1]}`}
            variant="outlined"
          />
          <Button
            style={styles.ratio}
            onPress={() => handleSetRatio([screenRatio[1], screenRatio[0]])}
            title={`${screenRatio[1]} : ${screenRatio[0]}`}
            variant="outlined"
          />
        </View>

        {!!recentlyUsedRatiosRef.current.length && (
          <>
            <Text style={styles.title}>Recently Used Ratios</Text>
            <View style={styles.ratiosContainer}>
              {recentlyUsedRatiosRef.current.map((ratio) => (
                <Button
                  key={`recently-used-${ratio}`}
                  style={styles.ratio}
                  onPress={() => handleSetRatio(ratio)}
                  title={`${ratio[0]} : ${ratio[1]}`}
                  variant="outlined"
                />
              ))}
            </View>
          </>
        )}

        <Text style={styles.title}>Default Ratios</Text>
        <View style={styles.ratiosContainer}>
          {defaultRatios.map(({ ratio, icon, text }) => (
            <Button
              key={`${icon}-${text}`}
              style={styles.ratio}
              onPress={() => handleSetRatio(ratio)}
            >
              <Icon size={20} name={icon} style={styles.ratioIcon} />
              <Text variant="button">{text}</Text>
            </Button>
          ))}
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
