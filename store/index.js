export const state = () => ({
  auth: {
    uid: null,
    displayName: '',
  },
})

export const mutations = {
  setAuth(state, { uid, displayName }) {
    state.auth.uid = uid
    state.auth.displayName = displayName
  },
  clearAuth(state) {
    state.auth.uid = null
    state.auth.displayName = ''
  },
}
