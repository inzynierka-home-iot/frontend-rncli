import { View } from 'react-native';
import { ListItem } from './ListItem';
import React from 'react';
import { faLightbulb, faTemperature2 } from '@fortawesome/free-solid-svg-icons';

const MyListItemMeta = {
  title: 'List Item',
  component: ListItem,
  decorators: [
    (Story: any) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          flexDirection: 'row',
        }}>
        <Story />
      </View>
    ),
  ],
};

export default MyListItemMeta;

export const Lamp = () => {
  return <ListItem text="Lampa 1" icon={faLightbulb} onPress={() => {}} />;
};

export const Temperature = () => {
  return (
    <ListItem text="Temperatura 1" icon={faTemperature2} onPress={() => {}} />
  );
};
