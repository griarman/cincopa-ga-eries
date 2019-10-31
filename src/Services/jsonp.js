import Helpers from '../libs/helpers';

const jsonpRequest = (origin, params, callbackName = null) => {
  return new Promise((resolve, reject) => {
    callbackName = callbackName || `callback_${Helpers.getRandomString()}`;
    let query = `?callback=${callbackName}`;

    Object.entries(params).forEach(([key, value]) => {
      query += `&${key}=${encodeURIComponent(value)}`;
    });

    const script = document.createElement('script');
    script.src = `${origin}${query}`;

    window[callbackName] = function(res) {
      document.body.removeChild(script);
      delete window[callbackName];
      resolve(res);
    };
    document.body.appendChild(script);
  });
};

export default jsonpRequest;
