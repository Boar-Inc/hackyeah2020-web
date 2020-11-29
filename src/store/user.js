export const state = () => ({
  sightings: [],
  requests: []
});

export const mutations = {
  submitSighting(state, id) {
    state.sightings = [...state.sightings, id]
  },
  removeSighting(state, id) {
    const idx = state.sightings.findIndex(x => x === id);
    const copy = [...state.sightings];
    copy.splice(idx, 1);
    state.sightings = copy;
  },
  pushRequest(state, req) {
    state.requests = [...state.requests, req];
  },
  clearRequests(state) {
    state.requests = [];
  }
}
