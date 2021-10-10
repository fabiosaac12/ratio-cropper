import React, { FC, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Button } from '../../../../components/Button';
import { Text } from '../../../../components/Text';
import { useImageHandler } from '../../../../providers/ImageHandler';
import { Ratio } from '../../../../providers/ImageHandler/models/Ratio';
import { useStyles } from './CustomRatioPickerStyles';

interface Props {
  handleSetRatio: (ratio: Ratio) => void;
}

export const CustomRatioPicker: FC<Props> = ({ handleSetRatio }) => {
  const styles = useStyles();
  const { ratio } = useImageHandler();
  const [values, setValues] = useState<Ratio>(ratio || [0, 0]);

  const handleSetValue = (position: number, _value: string) => {
    const value = parseInt(_value || '0');

    value < 10000 &&
      setValues((values) =>
        position ? [values[0], value] : [value, values[1]],
      );
  };

  const verifyValues = () => !values.some((value) => !value);

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType="number-pad"
        value={`${values[0]}`}
        onChangeText={(value) => handleSetValue(0, value)}
        style={styles.input}
      />
      <View style={styles.colon}>
        <View style={styles.colonPoint} />
        <View style={styles.colonPoint} />
      </View>
      <TextInput
        keyboardType="number-pad"
        value={`${values[1]}`}
        onChangeText={(value) => handleSetValue(1, value)}
        style={styles.input}
      />

      <Button
        style={styles.applyButton}
        onPress={() => handleSetRatio(values)}
        disabled={!verifyValues()}
      >
        <Text variant="button">
          {values[0]} : {values[1]}
        </Text>
      </Button>
    </View>
  );
};
