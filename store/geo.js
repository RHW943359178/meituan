export const state = () => ({
  position: {province: 'hh', city: 'kk'}
})

export const mutations = {
  setPosition(state, val) {
    state.position = val
  }
}

export const actions = {
  setPosition: ({
    commit
  }, position) => {
    commit('setPosition', position)
  }
}

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }
