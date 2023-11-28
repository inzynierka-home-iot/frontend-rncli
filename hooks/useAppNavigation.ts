import { useNavigation } from '@react-navigation/native';
// TODO repair import
import { RootNavigationProps } from '../App';

export const useAppNavigation = () => useNavigation<RootNavigationProps>();
