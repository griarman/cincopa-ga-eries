import axios from 'axios'

import jsonpRequest from './jsonp'

function CreateRequest(type = 'ajax', params) {
  try {
    const { status, message } = checkValid(params, type);
    if(!status) throw new Error(message);

    const { url, data = {}, callbackName = null } = params;

    switch (type) {
      case 'jsonp':
        return jsonpRequest(url, data, callbackName);
      case 'ajax':
        const { axiosStatus, axiosMessage } = checkAxiosSettings(params);
        if(!axiosStatus) throw new Error(axiosMessage);
        return axios({
          ...params,
          withCredentials: true
        });
    }
  }
  catch (e) {
    throw(e);
  }
}

const checkAxiosSettings = params => {
  const allowedParams = [
    'url',
    'data',
    'method',
    'cache',
    'dataType',
    'headers',
    'jsonp',
    'type',
  ];

  return Object.keys(params).filter(index => allowedParams.indexOf(index) === -1).length ? {
    axiosStatus: false,
    axiosMessage: 'There are invalid params in object',
  } : {
    axiosStatus: true,
    axiosMessage: 'Ok',
  }
};

const checkValid = (params, type) => {
  if (!(['ajax', 'jsonp'].includes(type))) {
    return {
      status: false,
      message: 'Request type can only be ajax, or jsonp',
    }
  }
  if (!params.hasOwnProperty('url')) {
    return {
      status: false,
      message: 'Url is required',
    }
  }
  return {
    status: true,
    message: 'Ok',
  };
};

export default CreateRequest;
