import axios from 'axios'

const RESPONSE_STATUS = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
}

// const api = 'http://localhost:3000/api/mapping'
const api = 'http://10.64.203.119/catalogmapping/getcatalogmapping/json'

class ApiService {
  getCatalogMapping (catalogId, siteId) {
    return axios.get(`${api}/${catalogId}/${siteId}`).then(response => {
      if (response.data.responseStatus === RESPONSE_STATUS.SUCCESS) {
        return response.data
      }

      throw new Error(response.data.errors)
    })
  }

  getCatalogProducts (categoryId, siteId) {
    return axios
      .get(`http://10.64.203.119/voyager/service.php`, { params: { category_id: categoryId, site_id: siteId }})
      .then(response => response.data)
  }
}

export default new ApiService()
