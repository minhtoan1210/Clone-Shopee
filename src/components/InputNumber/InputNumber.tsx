import { forwardRef, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

// do mình kế thừa từ typrscrip InputHTMLAttributes nên ko cần phải khai báo những thằng như type placeholder autoComplete vì nó đã có trong typescrip InputHTMLAttributes nên mình có thể lấy nó thong qua thằng rest
const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      //onChange trong này là onChange là onchange cảu thằng cha  khác với onChange ở dưới
      onChange(event)
    }
  }

  console.log("rest", rest)
  return (
    <div className={className}>
      <input className={classNameInput} onChange={(event) => handleChange(event)} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber