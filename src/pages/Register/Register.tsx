import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { registerAccount } from 'src/api/auth.api'
import Input from 'src/components/Input'
import { ResponseApi } from 'src/type/utils.type'
import { schema, Schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

// Đây là kiểu dữ liệu khi không xài thằng Yup
// interface TypeRegister {
//   email: string
//   password: string
//   confirm_password: number
// }

type TypeRegister = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm<TypeRegister>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<TypeRegister, 'confirm_password'>) => registerAccount(body)
  })
  // const rules = getRules(getValues)
  const onSubmit = handleSubmit(
    (data) => {
      // nếu như trường hợp đúng thì sẽ nhảy vào trường hợp này
      console.log('data', data)
      const body = omit(data, ['confirm_password'])
      registerAccountMutation.mutate(body, {
        onSuccess: (data) => {
          console.log(data)
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<ResponseApi<Omit<TypeRegister, 'confirm_password'>>>(error)) {
            const formError = error.response?.data.data
            {
              if (formError) {
                Object.keys(formError).forEach((key) => {
                  setError(key as keyof Omit<TypeRegister, 'confirm_password'>, {
                    message: formError[key as keyof Omit<TypeRegister, 'confirm_password'>],
                    type: 'Server'
                  })
                })
              }
            }
            console.log('error', error)
          }
        }
      })
    },
    () => {
      // nó sẽ kiểm tra tất cả giá trị nếu có 1 trường hợp sai cũng nhảy vào đây
      const password = getValues('password')
      console.log('password', password)
    }
  )

  //watch trong useForm như là onChange dùng để lắng nghe
  // const email = watch('email')
  // console.log('email', email)

  return (
    <div className='bg-orange'>
      {/* <Helmet>
        <title>Đăng ký | Shopee Clone</title>
        <meta name='description' content='Đăng ký tài khoản vào dự án Shopee Clone' />
      </Helmet> */}
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>

              <Input
                name='email'
                type='email'
                className='mt-2'
                placeholder='email'
                register={register}
                errorMessage={errors.email?.message}
                // rules={rules.email}
              />

              <Input
                name='password'
                type='password'
                className='mt-2'
                placeholder='password'
                autoComplete='on'
                register={register}
                errorMessage={errors.password?.message}
                // rules={rules.password}
              />

              <Input
                name='confirm_password'
                type='password'
                className='mt-2'
                placeholder='Confirm Password'
                autoComplete='on'
                register={register}
                errorMessage={errors.confirm_password?.message}
                // rules={rules.confirm_password}
              />

              <div className='mt-2'>
                <button className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
