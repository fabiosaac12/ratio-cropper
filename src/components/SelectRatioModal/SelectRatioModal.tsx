import React from 'react';
import { Button } from '../Button';
import { navigationContainerRef } from '../../navigation/MainStackNavigator';
import { useImageHandler } from '../../providers/ImageHandler';
import { Ratio } from '../../providers/ImageHandler/models/Ratio';
import { useModal } from '../../providers/Modal';
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStyles } from './SelectRatioModalStyles';
import { getDefaultRatios } from './helpers';
import { Text } from '../Text';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomRatioPicker } from './CustomRatioPicker';
import { simplifyRatio } from '../../helpers/simplifyRatio';
import { useMessages } from './SelectRatioModalMessages';

const screen = Dimensions.get('screen');

const screenRatio: Ratio = simplifyRatio([screen.height, screen.width]);

export const SelectRatioModal = () => {
  const styles = useStyles();
  const messages = useMessages();
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
        <View style={styles.section}>
          <CustomRatioPicker handleSetRatio={handleSetRatio} />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>{messages.phoneRatios}</Text>
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
        </View>

        {!!recentlyUsedRatiosRef.current.length && (
          <View style={styles.section}>
            <Text style={styles.title}>{messages.recentlyUsedRatios}</Text>
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
          </View>
        )}

        <Text style={[styles.title, styles.secondaryTextColor, styles.section]}>
          {messages.defaultRatios}
        </Text>
        <View>
          {getDefaultRatios().map((defaultRatios, index) => (
            <FlatList
              key={`defaultRatios-${index}`}
              contentContainerStyle={styles.section}
              showsHorizontalScrollIndicator={false}
              data={defaultRatios}
              horizontal
              keyExtractor={(item, index) =>
                `${item.icon} ${item.text} ${index}`
              }
              renderItem={({ item: { icon, ratio, text } }) => (
                <Button
                  key={`${icon}-${text}`}
                  style={styles.ratio}
                  onPress={() => handleSetRatio(ratio)}
                  color="secondary"
                >
                  <Icon size={20} name={icon} style={styles.ratioIcon} />
                  <Text variant="button">{text}</Text>
                </Button>
              )}
            />
          ))}
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
