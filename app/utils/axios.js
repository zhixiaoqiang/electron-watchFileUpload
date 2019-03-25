// import axios from 'axios'
// import adapters from 'axios/lib/adapters/http'
// // function requestErrorMsg (desc) {
// //   store.dispatch.global.notify({
// //     message: '请求错误',
// //     type: 'error',
// //     description: desc
// //   })
// // }
// function transformReq (request) {
//   const data = request.params
//   request.params = {
//     t: Date.now()
//   }
//   if (request.method === 'get') {
//     request.params['data'] = data || {}
//   }
//   if (request.method === 'post') {
//     request.data =
//       'data=' + encodeURIComponent(JSON.stringify(request.data || {}))
//     request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
//   }
//   return request
// }
// function successRes ({data}) {
//   const defaultError = {
//     message: '未知错误',
//     code: -1
//   }
//   if (!data) throw defaultError
//   if (!data.success) {
//     const error = {
//       message: data.msg,
//       code: data.code
//     }
//     throw error
//   }
//   return data.data
// }
// function errorRes (err) {
//   if (err.code === 'ECONNABORTED') {
//     throw '请求超时'
//   }
//   if (err.response) {
//     throw errorMsgMap[err.response.status]
//   } else {
//     throw err.message
//   }
//   throw err
// }

// axios.defaults.adapter = adapters

// const instance = axios.create({
//   timeout: 120000,
//   headers: { Accept: '*/*' },
//   withCredentials: true
// })
// instance.interceptors.request.use(transformReq)
// instance.interceptors.response.use(successRes, errorRes)
// export default instance
