import { mtproto } from './mtprotoClient';

export const resolveUserID = async (
  username: string,
): Promise<{ access_hash: string; id: string; first_name: string }> => {
  const res = await mtproto.call('contacts.resolveUsername', {
    username,
  });
  const { access_hash, id, first_name } = res.users[0];
  return { access_hash, id, first_name };
};
