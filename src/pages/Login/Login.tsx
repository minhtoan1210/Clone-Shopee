import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { loginAccount } from 'src/api/auth.api'
import Input from 'src/components/Input'
import { ResponseApi } from 'src/type/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type loginSchema = Omit<Schema, 'confirm_password'>
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<loginSchema>({
    resolver: yupResolver(schema.omit(['confirm_password']))
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: loginSchema) => loginAccount(body)
  })

  const onSubmit = handleSubmit(
    (data) => {
      console.log('data', data)
      loginAccountMutation.mutate(data, {
        onSuccess: (data) => {
          console.log('data', data)
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<ResponseApi<loginSchema>>(error)) {
            const formError = error.response?.data.data
            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof loginSchema, {
                  message: formError[key as keyof loginSchema],
                  type: 'Server'
                })
              })
            }
            console.log('formError', formError)
          }
        }
      })
    },
    (data) => {
      console.log('data', data)
    }
  )
  return (
    <div className='bg-orange'>
      {/* <Helmet>
        <title>Đăng nhập | Shopee Clone</title>
        <meta name='description' content='Đăng nhập vào dự án Shopee Clone' />
      </Helmet> */}
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                className='mt-8'
                type='email'
                register={register}
                errorMessage={errors.email?.message}
                placeholder='email'
              />
              <Input
                name='password'
                className='mt-2'
                type='password'
                register={register}
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />

              <div className='mt-3'>
                <button
                  type='submit'
                  className='flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  // isLoading={loginMutation.isLoading}
                  // disabled={loginMutation.isLoading}
                >
                  Đăng nhập
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
