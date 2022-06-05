import axios from 'axios'

export default axios.create({
    baseURL: 'http://your_kubernetes_ip:30002'
})
