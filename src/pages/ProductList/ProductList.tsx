import useQueryParams from 'src/hooks/useQueryParams'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/type/product.type'
import { isUndefined, omit, omitBy } from 'lodash'
import productApi from 'src/api/product.api'
import type { PaginationProps } from 'antd'
// import { Pagination } from 'antd'
import { Navigate, createSearchParams, useNavigate } from 'react-router-dom'
import categoryApi from 'src/api/category.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const navigate = useNavigate()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 20,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  )

  // const onChange: PaginationProps['onChange'] = (pagee) => {
  //   console.log('page', pagee)
  //   navigate({
  //     pathname: '/',
  //     search: createSearchParams({
  //       ...queryConfig,
  //       page: pagee.toString()
  //     }).toString()
  //   })
  // }

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  console.log('data', productsData?.data.data.products)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []}/>
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              {/* <Pagination current={Number(queryConfig.page)} onChange={onChange} total={50} />; */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
