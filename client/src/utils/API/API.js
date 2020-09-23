import axios from 'axios'

const API = {
  // **USER API CALLS**
  // Send Frontend data as object
  registerUser: (data) => axios.post(`/api/users/register`, data),
  loginUser: (data) => axios.post('/api/users/login', data),
  getUser: () => axios.get('/api/users/me'),

  // **USER PROFILE API CALLS**
  createSettings: (data) => axios.post(`/api/settings`, data),
  updateSettings: (data) => axios.put('/api/settings', data),

  // **BUISNESS API CALLS**
  createBusiness: (data) => axios.post(`/api/buisness`, data),
  updateBusiness: (data) => axios.put('/api/buisness', data),
  // !!! USE WITH EXTREME CAUTION !!!
  nukeBusiness: () => axios.delete('/api/buisness'),

  // **REVIEW API CALLS**
  createReview: (id) => axios.post(`/api/review/${id}`)
  findBusinessReviews: (id) => axios.get(`/api/review/buisness/${id}`) 
}

export default API
