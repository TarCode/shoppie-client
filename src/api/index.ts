import axios from "axios";


// const BASE_URL = 'https://murmuring-harbor-47924.herokuapp.com'
const BASE_URL = 'http://localhost:3001'
const stringifiedUser = localStorage.getItem('user') as string
const user = JSON.parse(stringifiedUser)

export const loginApi = (data: any) => (
  axios({
    method: 'post',
    url: BASE_URL + '/users/login',
    data,
  })
)
export const registerApi = (data: any) => (
  axios({
    method: 'post',
    url: BASE_URL + '/users/register',
    data,
  })
)

export const listsGetApi = () => (
  axios(BASE_URL + '/lists/', {
    headers: {
      'Authorization': user.token,
    },
  })
)

export const listGetApi = (id: string) => (
  axios(BASE_URL + '/lists/' + id, {
    headers: {
      'Authorization': user.token,
    },
  })
)

export const listPostApi = (data: any) => (
  axios({
    method: 'post',
    url: BASE_URL + '/lists/',
    data,
    headers: {
      'Authorization': user.token,
    },
  })
)

export const listPutApi = (listId: string, data: any) => axios({
  method: 'put',
  url: BASE_URL + '/lists/' + listId,
  data,
  headers: {
    'Authorization': user.token,
  },
})

export const listDeleteApi = (id: string) => (
  axios({
    method: 'delete',
    url: BASE_URL + '/lists/' + id,
    headers: {
      'Authorization': user.token,
    },
  })
)

export const itemsGetApi = (listId: string) => (
  axios(BASE_URL + '/items/list/' + listId, {
    headers: {
      'Authorization': user.token,
    },
  })
)

export const itemPostApi = (data: any) => (
  axios({
    method: 'post',
    url: BASE_URL + '/items/',
    data,
    headers: {
      'Authorization': user.token,
    },
  })
)

export const itemDeleteApi = (id: string) => (
  axios({
    method: 'delete',
    url: BASE_URL + '/items/' + id,
    headers: {
      'Authorization': user.token,
    },
  })
)