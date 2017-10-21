import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './ProvidersList.css';
import ProvidersItem from './ProvidersItem';

class ProvidersList extends Component {

  static defaultProps = {
    className: 'Providers-list',
  };

  static propTypes = {
    className: PropTypes.string,
    providers: PropTypes.array.isRequired,
    activeProviderId: PropTypes.string,
    onClick: PropTypes.func,
  };

  render() {
    return (
      <div className={this.props.className}>
        {
          this.props.providers.map(provider =>
            <ProvidersItem
              className="Providers-listItem"
              isActive={this.props.activeProviderId === provider.id}
              key={provider.id}
              provider={provider}
              onClick={this.props.onClick}
            />)
        }
      </div>
    );
  }
}

export default ProvidersList;
