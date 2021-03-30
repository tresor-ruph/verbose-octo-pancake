import axios from 'axios'
import ls from 'local-storage'

axios.defaults.baseURL='http://localhost:8000/api'

const token =  ls.get('token') 

axios.defaults.headers.common['Authorization'] = token != undefined ? `Bearer ${token}` : '' 