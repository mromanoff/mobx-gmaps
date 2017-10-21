import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {action, observable, reaction} from 'mobx';
import GoogleMap from 'google-map-react';

import {MAP} from './constants';
import PinIcon from './Pin';

//const K_SIZE = 22;

const K_SIZE = 40;


class Marker extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    $hover: PropTypes.bool,
    provider: PropTypes.object,
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
              <img alt={provider.name} className="ProviderMap-image"
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

@inject('providersStore')
@observer
export default class GMap extends Component {

  static defaultProps = {
    className: 'Providers-map',
  };

  static propTypes = {
    className: PropTypes.string,
    providersStore: PropTypes.object.isRequired,
  };

  @observable center = [40.7977734292, -73.9675693365];
  @observable zoom = 12;

  constructor(props) {
    super(props);


    reaction(
      () => this.props.providersStore.provider,
      (provider) => {
        this.recenterMap(provider.addresses[0].lat, provider.addresses[0].lng);
      },
    );
  }

  @action
  recenterMap = (lat, lng) => {
    this.center = [parseFloat(lat), parseFloat(lng)];
  };

  createMapOptions = (maps) => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      styles: MAP.THEME,
    };
  };

  @action
  _onChange = ({center, zoom /*, bounds, marginBounds*/}) => {
    this.center = center;
    this.zoom = zoom;
  };

  _onChildMouseEnter = (key /*, childProps */) => {
    //this.props.onHoverKeyChange(key);
    //console.log('on Child mouse enter', key);
  };

  _onChildMouseLeave = (key /*, childProps */) => {
    //this.props.onHoverKeyChange(null);
    //console.log('on Child mouse leave', key);
  };

  @action
  _onChildClick = (key /*, childProps*/) => {
    this.props.providersStore.setProviderById(key);
  };

  render() {
    const {providers, provider} = this.props.providersStore;

    const markers = providers.map(marker =>
      <Marker
        key={marker.id}
        lat={marker.addresses[0].lat}
        lng={marker.addresses[0].lng}
        isActive={provider.id === marker.id}
        hover={this.props.hoverKey === marker.id}
        provider={marker}
      />,
    );

    return (
      <div
        style={{width: '100%', height: '400px'}}
        className={this.props.className}
      >
        <GoogleMap
          bootstrapURLKeys={MAP.SETTINGS}
          options={this.createMapOptions}
          center={this.center}
          zoom={this.zoom}
          hoverDistance={K_SIZE / 2}
          onChange={this._onChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
          resetBoundsOnResize={true}
        >
          {markers}
        </GoogleMap>
      </div>
    );
  }
}