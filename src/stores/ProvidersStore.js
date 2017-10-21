import {action, observable} from 'mobx';

import uiStore from './UIStore';
import ProviderModel from '../models/ProviderModel';
import request from '../middleware/request';

//const PROVIDERS_URL = `/api/providers`;
const PROVIDERS_URL = `data/providers.json`;


class ProvidersStore {
  uiStore;

  @observable providers = [];
  @observable provider = {};


  constructor(uiStore) {
    this.uiStore = uiStore;
    window.providersStore = this;
  }

  // getCurrentProviderIndex() {
  //   const providers = this.getProvidersLocalStorage();
  //   return providers.findIndex(provider => provider.id === this.provider.id);
  // }

  setProviderById = (providerId) => {
    //const providers = this.getProvidersLocalStorage();
    this.setProvider(this.providers.find(provider => provider.id === providerId));
  };

  // getProviderById = (id) => {
  //   const providers = this.getProvidersLocalStorage();
  //
  //   if (providers === null || providers.length === 0) {
  //     return false;
  //   }
  //
  //   const provider = providers.find(provider => provider.id === id);
  //   return provider ? provider : false;
  // };

  // setProviderByIndex = (index) => {
  //   const providers = this.getProvidersLocalStorage();
  //   this.setProvider(providers[index]);
  // };

  @action
  reset = (collection) => {
    collection.length = 0;
  };

  @action
  setProvider = (provider) => {
    this.provider = new ProviderModel(this, provider);
  };

  @action
  setProviders = (property, provider) => {
    property.push(new ProviderModel(this, provider));
  };


  @action
  fetchProviders = async () => {
    this.uiStore.beforeFetch();

    try {
      const response = await request.get(PROVIDERS_URL);

      this.providers = response[0].providers;
      this.uiStore.afterFetch();

    } catch (error) {
      //this.isError = true;
      console.log('Error', error);
      this.uiStore.afterFetch();
    }
  };

  // fetchAll = () => {
  //   this.uiStore.beforeFetch();
  //   this.reset(this.providers);
  //
  //   let params = `?${this.filtersStore.urlQuery}`;
  //
  //   return fetch(`${PROVIDERS_URL}${params}`, HEADER_OPTIONS)
  //     .then(response => response.json().then(json => {
  //       return response.ok ? json : Promise.reject(json);
  //     }))
  //     .then((data) => {
  //
  //       //currently if there is no providers back end returns []
  //       if (!data.length) {
  //         Promise.reject('There is no providers in this area');
  //       } else {
  //         //TODO: we work only with 1 object page in collection for now. there are page 1,2,3 objects yet
  //         this.setPagination(data[0]);
  //         data[0].providers.forEach(provider => {
  //           this.setProviders(this.providers, provider);
  //         });
  //       }
  //
  //       this.uiStore.afterFetch();
  //     })
  //     .catch((err) => {
  //       this.uiStore.setError(err);
  //       this.uiStore.afterFetch();
  //     });
  // };

  // fetchOne = (id) => {
  //   this.uiStore.beforeFetch();
  //
  //   return fetch(`${PROVIDERS_URL}/${id}`, HEADER_OPTIONS)
  //     .then(response => response.json().then(json => {
  //       return response.ok ? json : Promise.reject(json);
  //     }))
  //     .then(data => {
  //       this.setProvider(data);
  //       this.uiStore.afterFetch();
  //     })
  //     .catch((err) => {
  //       this.uiStore.setError(err);
  //       this.uiStore.afterFetch();
  //     });
  // };

  toJS = () => {
    return this.providers.map(provider => provider.toJS());
  };
}

const providersStore = new ProvidersStore(uiStore);

/**
 * Export initialized store as default export,
 * and store class as named export.
 */
export default providersStore;
export {ProvidersStore};
