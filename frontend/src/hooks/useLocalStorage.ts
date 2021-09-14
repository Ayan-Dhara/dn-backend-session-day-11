import {useEffect, useState} from 'react'

const useLocalStorage:any = (key:string, initialValue:any = {}) => {
  const [value, setValue] = useState(()=>{
    return getValue(key, initialValue)
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])
  return [value, setValue]
}

const getValue = (key:string, initialValue:any) => {
  const data:any = localStorage.getItem(key)
  return JSON.parse(data) || initialValue
}

export default useLocalStorage;
