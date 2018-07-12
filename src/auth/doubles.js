export const toFakeUser = (mixins = {}) => ({
  ...mixins,
  id: 'foo',
});
