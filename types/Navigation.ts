import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  ConfirmAuth: {
    phoneCodeHash: string;
    diallingCode: string;
    phoneNumber: string;
  };
  Telegram: undefined;
  DeviceList: undefined;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;
