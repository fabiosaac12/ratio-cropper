import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
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
import { useMessages } from './HomeScreenMessages';

interface Props
  extends NativeStackScreenProps<MainStackNavigatorParams, 'home'> {}

export const HomeScreen = withLayout<Props>(() => {
  const styles = useStyles();
  const messages = useMessages();
  const { albums, selectedAlbum, setSelectedAlbum } = useAlbums();
  const sectionListRef = useRef<SectionList<any, any> | null>();

  const { handleTakePhotoFromGallery, handleTakePhoto } = useImageHandler();

  return (
    <SectionList
      ref={(ref) => (sectionListRef.current = ref)}
      overScrollMode="never"
      stickySectionHeadersEnabled
      renderSectionHeader={(some) =>
        some.section.key === 'home-section-list-item-2' ? (
          <View style={styles.albumTabsContainer}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={albums}
              horizontal
              renderItem={({ item }) => (
                <Button
                  onPress={() => {
                    setSelectedAlbum(item);
                    sectionListRef.current?.scrollToLocation({
                      animated: true,
                      sectionIndex: 0,
                      itemIndex: 0,
                    });
                  }}
                  title={item}
                  color="secondary"
                  variant={selectedAlbum === item ? 'filled' : 'outlined'}
                />
              )}
            />
          </View>
        ) : null
      }
      sections={[
        {
          key: 'home-section-list-item-1',
          data: [''],
          renderItem: () => (
            <View style={styles.buttonsContainer}>
              <View style={styles.horizontalContainer}>
                <Button
                  style={styles.button}
                  onPress={handleTakePhotoFromGallery}
                >
                  <Icon size={26} name={'image'} style={styles.buttonIcon} />
                  <Text variant="button">{messages.openGallery}</Text>
                </Button>
                <ThemeButton style={styles.themeButton} />
              </View>
              <Button style={styles.button} onPress={handleTakePhoto}>
                <Icon size={26} name={'camera'} style={styles.buttonIcon} />
                <Text variant="button">{messages.takePhoto}</Text>
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
