import axios from 'axios'
// const adapters2 = require('axios/lib/adapters/http')
axios.defaults.adapter = require('axios/lib/adapters/http')
// function requestErrorMsg (desc) {
//   store.dispatch.global.notify({
//     message: '请求错误',
//     type: 'error',
//     description: desc
//   })
// }

const errorMsgMap = {
  404: '请求地址有误。',
  500: '服务器错误。',
  502: '网关错误。'
}

function transformReq (request) {
  // console.warn('adapters2', adapters2);
  // request.adapter = adapters2
  const data = request.params
  request.params = {
    t: Date.now()
  }
  if (request.method === 'get') {
    request.params['data'] = data || {}
  }
  if (request.method === 'post') {
    // request.data =
    //   'data=' + encodeURIComponent(JSON.stringify(request.data || {}))
    // request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return request
}
function successRes ({data}) {
  const defaultError = {
    message: '未知错误',
    code: -1
  }
  if (!data) throw defaultError
  if (!data.success) {
    const error = {
      message: data.msg,
      code: data.code
    }
    throw error
  }
  return data.data
}
function errorRes (err) {
  console.warn(err)
  if (err.code === 'ECONNABORTED') {
    const error = {
      message: '请求超时',
      code: err.code
    }
    throw error
  }
  if (err.response) {
    const error = {
      message: errorMsgMap[err.response.status],
      code: err.code
    }
    throw error
  } else {
    throw err.message
  }
  // throw err
}

const instance = axios.create({
  timeout: 120000,
  headers: { Accept: '*/*' },
  withCredentials: true
  // adapter: adapters2
})
instance.interceptors.request.use(transformReq)
instance.interceptors.response.use(successRes, errorRes)
export default instance
