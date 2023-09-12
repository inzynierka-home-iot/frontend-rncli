import { mtproto } from './mtprotoClient';

export const connect = async () => {
  try {
    const res = await mtproto.call('help.getNearestDc');
    await mtproto.setDefaultDc(res.nearest_dc);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
