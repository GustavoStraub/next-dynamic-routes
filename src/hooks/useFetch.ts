import axios from 'axios'
import useSWR, { mutate as mutateGlobal } from 'swr'
import { Instace } from '../services/instance'

export function useFetch(url: string) {

  const { data, error } = useSWR(url, async url => {
    const response = await Instace.get(url)
    return response.data
  })
  return { data, error }
}

export function usePhotos(url: string) {

  const { data, error } = useSWR(url, async url => {
    const response = await axios.get(url)
    return response.data.sprites.front_default
  })
  return { data, error }
}
