import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';

import {MAP} from './constants';
import PinIcon from './Pin';

const K_SIZE = 22;

// const Marker = ({text, bgColor}) => (
//   <div style={{
//     position: 'relative', color: 'white', background: bgColor,
//     height: 22, width: 22, top: -11, left: -22,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }}>
//     {text}
//   </div>
// );

// const MarkerStyle = {
//   // initially any map object has left top corner at lat lng coordinates
//   // it's on you to set object origin to 0,0 coordinates
//   position: 'absolute',
//   width: K_SIZE,
//   height: K_SIZE,
//   left: -K_SIZE / 2,
//   top: -K_SIZE / 2,
//
//   border: '5px solid #f44336',
//   borderRadius: K_SIZE,
//   backgroundColor: 'white',
//   textAlign: 'center',
//   color: '#3f51b5',
//   fontSize: 16,
//   fontWeight: 'bold',
//   padding: 4,
//   cursor: 'pointer',
// };
//
// const MarkerStyleHover = {
//   ...MarkerStyle,
//   border: '5px solid #3f51b5',
//   color: '#f44336',
// };


class Marker extends Component {

  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism, explained in x_distance_hover example
    $hover: PropTypes.bool,
    id: PropTypes.string,
    isActive: PropTypes.bool,
  };

  static defaultProps = {};

  render() {
    //const style = this.props.$hover ? MarkerStyleHover : MarkerStyle;
    const className = this.props.$hover ? 'Icon-pin--hover' : 'Icon-pin';

    return (
      <PinIcon
        className={`Icon ${className}  ${this.props.isActive ? 'is-active' : '' }`}
      />
    );
  }
}

export default class GMap extends Component {

  static propTypes = {
    className: PropTypes.string,
    activeProviderId: PropTypes.string,
    providers: PropTypes.array.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: 'Providers-map',
    //center: [40.7977734292, -73.9675693365],
    //zoom: 12,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeProviderId: this.props.activeProviderId,
      center: [40.7977734292, -73.9675693365],
      zoom: 12,
    };
  }

  createMapOptions = (maps) => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      styles: MAP.THEME,
    };
  };

  _onChange = ({center, zoom, bounds, marginBounds}) => {
    //this.props.onCenterChange(center);
    //this.props.onZoomChange(zoom);
    //console.log('bounds change', bounds);
    this.setState({
      center: center,
      zoom: zoom,
    });

  };

  _onChildMouseEnter = (key /*, childProps */) => {
    //this.props.onHoverKeyChange(key);

    //console.log('on Child mouse enter', key);
  };

  _onChildMouseLeave = (key /*, childProps */) => {
    //this.props.onHoverKeyChange(null);
    //console.log('on Child mouse leave', key);
  };

  _onChildClick = (key, childProps) => {

    //debugger;

    //const markerId = childProps.id;
    //const activeProvider = this.props.providers.find(provider => provider.id === markerId);

    //console.log('index', activeProvider);



    //console.log('markerId', markerId, index);
    //this.props.onCenterChange([childProps.lat, childProps.lng]);

    console.log('child click', key, childProps);

    if (this.props.onClick) {
      this.props.onClick(childProps.id);
    }

    this.setState({
      center: [parseFloat(childProps.lat), parseFloat(childProps.lng)],
    });
  };

  render() {

    const places = this.props.providers.map(provider => {
        const {id, addresses} = provider;

        return (
          <Marker
            key={id}
            lat={addresses[0].lat}
            lng={addresses[0].lng}
            id={id}
            isActive={this.props.activeProviderId === id}
            hover={this.props.hoverKey === id}
          />
        );
      },
    );

    return (
      <div
        style={{width: '100%', height: '400px'}}
        className={this.props.className}
      >
        <GoogleMap
          bootstrapURLKeys={MAP.SETTINGS}
          options={this.createMapOptions}
          center={this.state.center}
          zoom={this.state.zoom}
          hoverDistance={K_SIZE / 2}
          onChange={this._onChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
          //onClick={this.props.onClick}
        >

          {places}

        </GoogleMap>
      </div>
    );
  }
}