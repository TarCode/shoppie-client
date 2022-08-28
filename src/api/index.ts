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