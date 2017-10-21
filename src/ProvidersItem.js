import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './ProvidersList.css';
import {inject, observer} from 'mobx-react';

@inject('providersStore')
@observer
class ProvidersList extends Component {

  static defaultProps = {
    className: 'Providers-listItem',
  };

  static propTypes = {
    className: PropTypes.string,
    provider: PropTypes.object.isRequired,
    providersStore: PropTypes.object.isRequired,
  };

  render() {
    const {provider, setProviderById} = this.props.providersStore;
    const {id, name} = this.props.provider;
    const isActive = id === provider.id;

    return (
      <div
        className={`${this.props.className} ${isActive ? 'is-active' : ''}`}
        onClick={() => setProviderById(id)}
      >
        {id}. {name}
      </div>
    );
  }
}

export default ProvidersList;
