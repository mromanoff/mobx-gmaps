// @flow

import 'whatwg-fetch';
import {objectToSearchParams} from '../utilities';

export const API = {
  postForm: async (url: string, payload: Object): Promise<any> => {
    let options = {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }),
      method: 'POST',
      cache: 'no-cache',
      credentials: 'include',
      body: objectToSearchParams(payload),
    };

    const response = await fetch(url, options);
    const body: Object = await response.json();

    if (!response.ok) {
      throw body;
    }
    return body;
  },

  post: async (url: string, payload: Object): Promise<any> => {
    let options = {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      method: 'POST',
      cache: 'no-cache',
      credentials: 'include',
      body: JSON.stringify(payload),
    };

    const response = await fetch(url, options);
    const body: Object = await response.json();

    if (!response.ok) {
      throw body;
    }
    return body;
  },

  put: async (url: string, payload: Object): Promise<any> => {
    let options = {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      method: 'PUT',
      cache: 'no-cache',
      credentials: 'include',
      body: JSON.stringify(payload),
    };

    const response = await fetch(url, options);
    const body: Object = await response.json();

    if (!response.ok) {
      throw body;
    }
    return body;
  },

  get: async (url: string): Promise<any> => {
    const options = {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      method: 'GET',
      cache: 'no-cache',
      credentials: 'include',
    };

    const response = await fetch(url, options);
    const body: Object = await response.json();

    if (!response.ok) {

      console.log('response', response)

      throw body;
    }
    return body;
  },

  delete: async (url: string) => {
    const options = {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      method: 'DELETE',
      cache: 'no-cache',
      credentials: 'include',
    };

    const response = await fetch(url, options);
    const body: Object = await response.json();

    if (!response.ok) {
      throw body;
    }
    return body;
  },


};

export default API;
