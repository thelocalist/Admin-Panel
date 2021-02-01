import { fetchUtils } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import { API_URL, AUTH_TOKEN_NAME } from './constants';

export const fetchConfig = {
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

const applyAuthToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  if (!token) {
    return;
  }
  fetchConfig.headers.set('Authorization', token);
};

const saveToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_NAME, token);
  applyAuthToken();
};

const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_NAME);
  fetchConfig.headers.delete('Authorization');
};

const isTokenPresent = () => !!localStorage.getItem(AUTH_TOKEN_NAME);

const login = ({ username, password }) =>
  fetchUtils
    .fetchJson(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: username,
        password,
      }),
      ...fetchConfig,
    })
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      const data = response.json;
      saveToken(data.accessToken);
      return data;
    });

export const logoutOnAuthError = ({ status }) => {
  if (status === 401 || status === 403) {
    document.location.hash = '#/login';
    removeToken();
  }
};

const dataProvider = restProvider(`${API_URL}/admin`, (url, options = {}) =>
  fetchUtils.fetchJson(url, {
    ...options,
    ...fetchConfig,
  })
);

const convertFileToBase64 = (file) => {
  console.log('FILE');
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });
};

export const myDataProvider = {
  ...dataProvider,
  create: (resource, params) => {
    if (
      (resource !== 'communities' && resource !== 'stories') ||
      !params.data.pictures
    ) {
      // fallback to the default implementation
      return dataProvider.create(resource, params);
    }
    const images = [params.data.pictures];

    return Promise.all(images.map(convertFileToBase64))
      .then((base64Pictures) =>
        base64Pictures.map((picture64) => ({
          src: picture64,
          title: `${params.data.title}`,
        }))
      )
      .then((transformedNewPictures) =>
        dataProvider.create(resource, {
          ...params,
          data: {
            ...params.data,
            pictures: [...transformedNewPictures],
          },
        })
      );
  },
};

// eslint-disable-next-line complexity
export const authProvider = {
  // authentication
  login,
  checkError: (error) => {
    logoutOnAuthError(error);
    return Promise.resolve();
  },
  checkAuth: () => (isTokenPresent() ? Promise.resolve() : Promise.reject()),
  logout: () => {
    removeToken();
    return Promise.resolve();
  },
  getIdentity: () => Promise.resolve(),
  // authorization
  getPermissions: () => Promise.resolve(),
};

applyAuthToken();
