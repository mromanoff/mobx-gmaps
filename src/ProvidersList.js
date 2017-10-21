import './ProvidersList.css';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

import ProvidersItem from './ProvidersItem';

@inject('providersStore')
@observer
class ProvidersList extends Component {

  static defaultProps = {
    className: 'Providers-list',
  };

  static propTypes = {
    className: PropTypes.string,
    providersStore: PropTypes.object.isRequired,
  };

  render() {
    const {providers} = this.props.providersStore;

    return (
      <div className={this.props.className}>
        {
          providers.map(provider =>
            <ProvidersItem
              className="Providers-listItem"
              key={provider.id}
              provider={provider}
            />)
        }
      </div>
    );
  }
}

export default ProvidersList;
