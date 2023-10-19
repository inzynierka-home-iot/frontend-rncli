import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../App';

export const useAppNavigation = () => useNavigation<RootNavigationProps>();
