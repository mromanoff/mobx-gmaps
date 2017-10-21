import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

import GoogleMapReact from './GoogleMapReact';
import ProvidersList from './ProvidersList';

@inject('providersStore', 'uiStore')
@observer
class Providers extends Component {

  static propTypes = {
    providersStore: PropTypes.object.isRequired,
    uiStore: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.providersStore = this.props.providersStore;
    this.uiStore = this.props.uiStore;

    this.providersStore.fetchProviders();
  }

  render() {

    if (this.uiStore.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="Providers">

        <h1>Providers</h1>

        <GoogleMapReact className={'Providers-map'}/>

        <ProvidersList className={'Providers-list'}/>

      </div>
    );
  }
}

export default Providers;
