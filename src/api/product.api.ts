import { AuthResponse } from 'src/type/auth.type'
import { Product, ProductList, ProductListConfig } from 'src/type/product.type'
import { SuccessResponse } from 'src/type/utils.type'
import http from 'src/utils/http'

const url = 'products'
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(url, {
      params
    })
  },

  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}

export default productApi
