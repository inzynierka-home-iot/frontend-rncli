import { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import { InputProps } from '../.storybook/stories';
import { SignInData } from '../types';
import { sendVerificationCode } from '../utils';
import { useAppNavigation } from './useAppNavigation';
import { useAppDispatch } from '../redux/hooks';

export const useSendVerificationCode = () => {
  const dispatch = useAppDispatch();

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [phoneVariant, setPhoneVariant] =
    useState<InputProps['variant']>('default');

  const navigation = useAppNavigation();

  const onLogin = useCallback(
    async ({ diallingCode, phoneNumber }: SignInData) => {
      setPhoneVariant('default');
      setIsButtonDisabled(true);
      const res = await sendVerificationCode(
        '+' + diallingCode + phoneNumber,
        dispatch,
      );
      setIsButtonDisabled(false);
      if (res.success && res.res.phone_code_hash) {
        navigation.navigate('ConfirmAuth', {
          phoneCodeHash: res.res.phone_code_hash,
          diallingCode,
          phoneNumber,
        });
      } else {
        setIsButtonDisabled(false);
        setPhoneVariant('error');
      }
      Keyboard.dismiss();
    },
    [navigation],
  );

  return { isLoginButtonDisabled: isButtonDisabled, phoneVariant, onLogin };
};
