import axios from 'axios'
import store from './store/index';

// @ts-expect-error
const baseUrl = config.VUE_APP_API_URL || process.env.VUE_APP_API_URL

const plainInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const securedInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

securedInstance.interceptors.response.use(
  (response) => {
      return response;
  },
  async (error) => {
    if (error.response && error.response.config && error.response.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        if(refreshToken != null) {
            try {
              const response = await plainInstance({
                method: 'post',
                url: '/user/refresh-token',
                data: {
                    token: refreshToken,
                }});
              
              store.commit('setAuthToken', response.data.jwt);
              securedInstance.defaults.headers.common['Authorization'] = `bearer ${response.data.jwt}`;
              error.config.headers['Authorization'] = `bearer ${response.data.jwt}`;
            } catch (error) {
              // store.commit('logout');
            }
        }
        // else {
          // store.commit('logout');
        // }
        return axios(error.config);
    } else {
        return Promise.reject(error);
    }
  }
);

export { securedInstance, plainInstance }