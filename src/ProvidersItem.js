import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './ProvidersList.css';

class ProvidersList extends Component {

  static defaultProps = {
    className: 'Providers-listItem',
  };

  static propTypes = {
    className: PropTypes.string,
    provider: PropTypes.object.isRequired,
    onClick: PropTypes.func,
  };

  render() {
    return (
      <div
        className={this.props.className}
        onClick={() => this.props.onClick(this.props.provider)}
      >
        {this.props.provider.id}. {this.props.provider.name}
      </div>
    );
  }
}

export default ProvidersList;
