/* eslint-disable no-console */
import { Plugin } from '@nuxt/types'
import { AxiosResponse, AxiosError } from 'axios'

const axiosPlugin: Plugin = ({ $axios, redirect }, _) => {

  $axios.onRequest(() => {

  })

  $axios.onResponse((response: any) => {
    console.log(response)
  })

  $axios.onError((error: any) => {
    if (error.response) {
      try {
        switch (error.response.status) {
          case 400:
            console.error('Networking : 400 Bad Request.')
            break
          case 401:
            console.error('Networking : 401 Unauthorized.')
            redirect('/logout')
            break
          case 403:
            console.error('Networking : 403 Forbidden.')
            redirect('/logout')
            break
          case 404:
            console.error('Networking : 404 Not Found.')
            break
          case 500:
            console.error('Networking : 500 Internal Server Error.')
            break
          default:
            console.error(error.message)
            break
        }
      } catch (error) {
        console.error(error)
        return redirect('/error')
      }
    }
  })
}

export default axiosPlugin