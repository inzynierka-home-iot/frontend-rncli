import EncryptedStorage from 'react-native-encrypted-storage';

export const SaveStoredValue = async (key: string, value: string) => {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const ReadStoredValue = async (key: string) => {
  const res = await EncryptedStorage.getItem(key);
  return res;
};

export const RemoveStoredValue = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const ClearStorage = async () => {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
