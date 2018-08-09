export const state = () => ({
  counter: 0,
  toggle: false
})


export const getters = {

  GET_COUNTER(state){
    return state.counter
  },
  GET_TOGGLE (state) {
    return state.toggle
  }
}

export const mutations = {
  SET_COUNTER (state) {
    state.counter++
  },
  SET_TOGGLE (state,status) {
    state.toggle = status
  }
}
