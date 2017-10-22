import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PinIcon from './PinIcon';


export default class Marker extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    $hover: PropTypes.bool,
    provider: PropTypes.object,
    isActive: PropTypes.bool,
  };

  render() {
    const className = this.props.$hover ? 'Icon-pin--hover' : 'Icon-pin';
    const {provider} = this.props;

    return (
      <div>
        <PinIcon
          className={`Icon ${className}  ${this.props.isActive ? 'is-active' : '' }`}
        />
        <div className={`ProviderMap-infoWindow ${this.props.isActive ? 'is-active' : '' }`}>
          <div className="ProviderMap-wrapper">

            <div className="ProviderMap-imageWrapper">
              <img
                alt={provider.name}
                className="ProviderMap-image"
                src={provider.photoUrl}/>
            </div>
            <h3 className="ProviderMap-name">
              <a href={`/providers/${provider.id}`}>{provider.name}</a>
            </h3>
            <h4 className="ProviderMap-address">{provider.addresses[0].address}</h4>
          </div>
        </div>
      </div>
    );
  }
}
