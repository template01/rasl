export const state = () => ({
  counter: 0,
  toggle: false
})


export const getters = {

  GET_COUNTER(state){
    return state.counter
  },
}

export const mutations = {
  SET_COUNTER (state) {
    state.counter++
  },
  SET_TOGGLE (state,status) {
    state.toggle = status
  }
}
