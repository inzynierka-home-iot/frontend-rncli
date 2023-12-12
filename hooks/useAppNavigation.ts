import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../types';

export const useAppNavigation = () => useNavigation<RootNavigationProps>();
