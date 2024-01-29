import { Category } from 'src/type/category'
import { SuccessResponse } from 'src/type/utils.type'
import http from 'src/utils/http'

const url = 'categories'
const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(url)
  },
}

export default categoryApi
