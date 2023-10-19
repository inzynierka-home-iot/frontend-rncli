import { Dispatch, SetStateAction, useState } from 'react';
import { Keyboard } from 'react-native';
import { InputProps } from '../../../.storybook/stories';
import { useAppNavigation } from '../../../hooks';
import { SignInData } from '../../../types';
import { logInCode } from '../../../utils';
import {
  ReadStoredValue,
  SaveStoredValue,
} from '../../../utils/EncryptedStorage';
import { resolveBotID } from '../../../utils/resolveBotID';

export const useConfirmCodeClick = (
  phoneCodeHash: string,
  setIs2FANeeded: Dispatch<SetStateAction<boolean>>,
) => {
  const navigation = useAppNavigation();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [codeVariant, setCodeVariant] =
    useState<InputProps['variant']>('default');

  const onConfirm = async ({
    diallingCode,
    phoneNumber,
    phoneCode,
  }: SignInData) => {
    setCodeVariant('default');
    setIsButtonDisabled(true);
    const res = await logInCode(
      '+' + diallingCode + phoneNumber,
      phoneCodeHash,
      phoneCode,
    );
    setIsButtonDisabled(false);

    if (res === '2fa') {
      setIs2FANeeded(true);
    }
    if (res._ === 'auth.authorization') {
      const botAccessHash = await ReadStoredValue(
        'bot_conversation_access_hash',
      );
      const botUserID = await ReadStoredValue('bot_user_id');
      if (!botAccessHash || !botUserID) {
        await resolveBotID();
      }
      SaveStoredValue('SignedIn', 'true');
      navigation.navigate('DeviceList');
    } else {
      setCodeVariant('error');
    }
    Keyboard.dismiss();
  };

  return { isConfirmButtonDisabled: isButtonDisabled, codeVariant, onConfirm };
};
