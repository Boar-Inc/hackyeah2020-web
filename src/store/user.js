export const state = () => ({
  sightings: [],
  requests: []
});

export const mutations = {
  submitSighting(state, id) {
    state.sightings = [...state.sightings, id]
  },
  pushRequest(state, req) {
    state.requests = [...state.requests, req];
  },
  clearRequests(state) {
    state.requests = [];
  }
}
