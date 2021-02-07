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

const readFileAsBase64 = ({ key, rawFile }) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ key, value: reader.result });
    reader.onerror = reject;

    reader.readAsDataURL(rawFile);
  });

const isImage = ({ rawFile }) => rawFile instanceof File;

const getDataWithoutImages = (params) =>
  Object.keys(params.data).reduce((data, key) => {
    const value = params.data[key];

    if (!isImage(value)) {
      // eslint-disable-next-line no-param-reassign
      data[key] = value;
    }
    return data;
  }, {});

const getImagesData = (params) =>
  Object.keys(params.data).reduce((data, key) => {
    const value = params.data[key];

    if (isImage(value)) {
      data.push({
        ...value,
        key,
      });
    }
    return data;
  }, []);

const convertImagesToBase64 = (params) => {
  const dataWithoutImages = getDataWithoutImages(params);
  const dataImagesArray = getImagesData(params);

  return Promise.all(dataImagesArray.map(readFileAsBase64)).then(
    (base64Images) => ({
      ...params,
      data: {
        ...dataWithoutImages,
        ...base64Images.reduce((data, { key, value }) => {
          // eslint-disable-next-line no-param-reassign
          data[key] = value;
          return data;
        }, {}),
      },
    })
  );
};

export const myDataProvider = {
  ...dataProvider,
  create: (resource, params) =>
    convertImagesToBase64(params).then((paramsWithImages) =>
      dataProvider.create(resource, paramsWithImages)
    ),
  update: (resource, params) =>
    convertImagesToBase64(params).then((paramsWithImages) =>
      dataProvider.update(resource, paramsWithImages)
    ),
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
