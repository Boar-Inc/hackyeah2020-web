export const state = () => ({
  sightings: ['c31d1071-3524-458f-bbb9-b0f47a7891fc']
});

export const mutations = {
  submitSighting(state, id) {
    state.sightings = [...state.sightings, id]
  }
}
