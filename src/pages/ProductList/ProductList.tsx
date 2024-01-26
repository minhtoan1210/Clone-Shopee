import useQueryParams from 'src/hooks/useQueryParams'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'
import { useQuery } from '@tanstack/react-query'
import ProductApi from 'src/api/product.api'
import Pagination from 'src/components/Pagination'
import { useState } from 'react'
export default function ProductList() {
  const [page, setPage] = useState(1)
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return ProductApi.getProducts(queryParams)
    }
  })

  console.log('data', data?.data.data.products)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {data &&
                data?.data?.data.products.map((product, index) => (
                  <div className='col-span-1' key={index}>
                    <Product product={product}/>
                  </div>
                ))}
            </div>
            <Pagination page={page} setPage={setPage} pageSize={7} />
          </div>
        </div>
      </div>
    </div>
  )
}
