import { mtproto } from './mtprotoClient';

export const connect = async () => {
  try {
    const res = await mtproto.call('help.getNearestDc');
    await mtproto.setDefaultDc(res.nearest_dc);
    // const res = await mtproto.setDefaultDc(4);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
