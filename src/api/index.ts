import axios from "axios";

const stringifiedUser = localStorage.getItem('user') as string
const user = JSON.parse(stringifiedUser)

export const loginApi = (data: any) => (
  axios({
    method: 'post',
    url: 'https://murmuring-harbor-47924.herokuapp.com/user/login',
    data,
  })
)
export const registerApi = (data: any) => (
  axios({
    method: 'post',
    url: 'https://murmuring-harbor-47924.herokuapp.com/user/register',
    data,
  })
)

export const listsGetApi = () => (
  axios('https://murmuring-harbor-47924.herokuapp.com/lists/', {
    headers: {
      'x-access-token': user.token,
    },
  })
)

export const listGetApi = (id: string) => (
  axios('https://murmuring-harbor-47924.herokuapp.com/lists/' + id, {
    headers: {
      'x-access-token': user.token,
    },
  })
)

export const listPostApi = (data: any) => (
  axios({
    method: 'post',
    url: 'https://murmuring-harbor-47924.herokuapp.com/lists/',
    data,
    headers: {
      'x-access-token': user.token,
    },
  })
)

export const listPutApi = (listId: string, data: any) => axios({
  method: 'put',
  url: 'https://murmuring-harbor-47924.herokuapp.com/lists/' + listId,
  data,
  headers: {
    'x-access-token': user.token,
  },
})

export const listDeleteApi = (id: string) => (
  axios({
    method: 'delete',
    url: 'https://murmuring-harbor-47924.herokuapp.com/lists/' + id,
    headers: {
      'x-access-token': user.token,
    },
  })
)

export const itemsGetApi = (listId: string) => (
  axios('https://murmuring-harbor-47924.herokuapp.com/items/list/' + listId, {
    headers: {
      'x-access-token': user.token,
    },
  })
)