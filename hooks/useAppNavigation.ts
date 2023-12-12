import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../types';
// TODO repair import
// import { RootNavigationProps } from '../App';

export const useAppNavigation = () => useNavigation<RootNavigationProps>();
