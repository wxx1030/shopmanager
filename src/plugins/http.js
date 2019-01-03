import axios from 'axios'
const Http = {}
Http.install = function (Vue, options) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}

// 导出
export default Http
