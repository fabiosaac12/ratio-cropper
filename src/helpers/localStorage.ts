import AsyncStorage from '@react-native-community/async-storage';

export const getItem = async <T>(key: string): Promise<T | undefined> => {
  try {
    const value = (await AsyncStorage.getItem(key)) as T | null;

    if (!value) return;

    try {
      return JSON.parse(value as unknown as string);
    } catch {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};

export const setItem = async (key: string, value: string | any[] | object) => {
  try {
    await AsyncStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value),
    );

    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);

    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
};
