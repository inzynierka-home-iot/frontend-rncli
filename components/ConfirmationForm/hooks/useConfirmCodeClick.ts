import { Dispatch, SetStateAction, useState } from 'react';
import { Keyboard } from 'react-native';
import { InputProps } from '../../../.storybook/stories';
import { useAppNavigation } from '../../../hooks';
import { SignInData } from '../../../types';
import { logInCode, SaveStoredValue } from '../../../utils';
import { useAppDispatch } from '../../../redux/hooks';

export const useConfirmCodeClick = (
  phoneCodeHash: string,
  setIs2FANeeded: Dispatch<SetStateAction<boolean>>,
) => {
  const dispatch = useAppDispatch();
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
      dispatch,
    );
    setIsButtonDisabled(false);

    if (res === '2fa') {
      setIs2FANeeded(true);
    }
    if (res._ === 'auth.authorization') {
      await SaveStoredValue('SignedIn', 'true');
      navigation.navigate('LocationList');
    } else {
      setCodeVariant('error');
    }
    Keyboard.dismiss();
  };

  return { isConfirmButtonDisabled: isButtonDisabled, codeVariant, onConfirm };
};
