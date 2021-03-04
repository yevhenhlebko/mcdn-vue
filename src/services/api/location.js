import api from '@/api.js'
export default {
  /**
  * Get user locations
  *
  * @example
  *
  *     getLocations()
  */
  getLocations() {
    return api.$get('/locations')
  },

  /**
  * Add a new Company location
  *
  * @param {Object} data New location object
  * @param {string} data.name Location name
  * @param {string} data.state State state
  * @param {string} data.city City name
  * @param {string} data.zip Zip code
  * @example
  *
  *     addLocation({
  *       name: 'Location 1',
  *       state: 'Alabama',
  *       city: 'Abbeville',
  *       zip: '36310',
  *     })
  */
  addLocation(data) {
  	return api.$post('/locations', data)
  },

  /**
  * Update a customer location
  *
  * @param {Object} data Location data
  * @param {number} data.id The id of location
  * @param {string} data.name Location name
  * @param {string} data.state State state
  * @param {string} data.city City name
  * @param {string} data.zip Zip code
  * @example
  *
  *     updateLocation({
  *       id: '1',
  *       customer_id: 3,
  *       name: 'New Berlin Location',
  *       state: 'Wisconsin',
  *       city: 'New Berlin',
  *       zip: '53151',
  *     })
  */
  updateLocation(data) {
    return api.$patch(`/locations/${data.id}`, data)
  }
}
