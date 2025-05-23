import axios from 'axios'
import ls from 'local-storage'

axios.defaults.baseURL='http://localhost:8080/api'
//axios.defaults.baseURL='https://verbose-octo-pancake.herokuapp.com/api'

const token =  JSON.parse(ls.get('token')) 
axios.defaults.headers.common['Authorization'] = token != undefined ? `Bearer ${token}` : '' 