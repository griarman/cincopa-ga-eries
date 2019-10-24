import Helpers from './helpers';

const jsonpRequest = (origin, params) => {
  return new Promise((resolve, reject) => {
    let query = '?';
    const callbackName = `JQuery${Helpers.getRandomString()}`;

    Object.entries(params).forEach(([key, value]) => {
      query += `${key}=${encodeURIComponent(value)}&`;
    });

    query += `callback=${callbackName}`;

    const script = document.createElement('script');
    script.src = `${origin}${query}`;

    window[callbackName] = function(res) {
      document.body.removeChild(script);
      delete window[callbackName];
      resolve(res);
    };
    document.body.appendChild(script);
  })
};

export default jsonpRequest;