export const toFakeUser = (mixins = {}) => ({
  ...mixins,
  uid: 'foo',
  email: 'foo@bar.com',
});
