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
  Light: {
    location: string;
    node: string;
    lightId: string;
    botHash: string;
    botId: string;
  };
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;
