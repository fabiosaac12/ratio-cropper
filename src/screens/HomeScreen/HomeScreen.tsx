import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, SectionList, View } from 'react-native';
import { Button } from '../../components/Button';
import { Gallery } from '../../components/Gallery';
import { withLayout } from '../../hoc';
import { useAlbums } from '../../hooks/useAlbums';
import { MainStackNavigatorParams } from '../../navigation/MainStackNavigator';
import { useImageHandler } from '../../providers/ImageHandler';
import { useStyles } from './HomeScreenStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from '../../components/Text';
import { ThemeButton } from '../../components/ThemeButton';

interface Props
  extends NativeStackScreenProps<MainStackNavigatorParams, 'home'> {}

export const HomeScreen = withLayout<Props>(() => {
  const styles = useStyles();
  const { albums, selectedAlbum, setSelectedAlbum } = useAlbums();

  const { handleTakePhotoFromGallery, handleTakePhoto } = useImageHandler();

  return (
    <SectionList
      stickySectionHeadersEnabled
      renderSectionHeader={(some) =>
        some.section.key === 'home-section-list-item-2' ? (
          <FlatList
            data={albums}
            horizontal
            renderItem={({ item }) => (
              <Button
                onPress={() => setSelectedAlbum(item)}
                title={item}
                disabled={selectedAlbum === item}
              />
            )}
          />
        ) : null
      }
      sections={[
        {
          key: 'home-section-list-item-1',
          data: [''],
          renderItem: () => (
            <View style={styles.buttonsContainer}>
              <ThemeButton style={styles.themeButton} />
              <Button
                style={styles.button}
                onPress={handleTakePhotoFromGallery}
              >
                <Icon size={26} name={'image'} style={styles.buttonIcon} />
                <Text variant="button">Open phone gallery</Text>
              </Button>
              <Button style={styles.button} onPress={handleTakePhoto}>
                <Icon size={26} name={'camera'} style={styles.buttonIcon} />
                <Text variant="button">Take a photo</Text>
              </Button>
            </View>
          ),
        },
        {
          key: 'home-section-list-item-2',
          data: [''],
          renderItem: () => <Gallery selectedAlbum={selectedAlbum} />,
        },
      ]}
    />
  );
});
