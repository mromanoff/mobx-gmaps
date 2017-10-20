import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import controllable from 'react-controllables';

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
    text: PropTypes.string,
  };

  static defaultProps = {};

  //shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    //const style = this.props.$hover ? MarkerStyleHover : MarkerStyle;
    const className = this.props.$hover ? 'Icon-pin--hover' : 'Icon-pin';

    return (
        <PinIcon className={`Icon ${className}`}/>
    );
  }
}


class GMap extends Component {

  static propTypes = {
    center: PropTypes.array, // @controllable
    zoom: PropTypes.number, // @controllable
    hoverKey: PropTypes.string, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn
  };

  static defaultProps = {
    center: [40.7977734292, -73.9675693365],
    zoom: 12,
  };

  constructor(props) {
    super(props);
  }

  createMapOptions = (maps) => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      styles: MAP.THEME
    }
  }

  _onBoundsChange = (center, zoom , bounds, marginBounds) => {
    this.props.onCenterChange(center);
    this.props.onZoomChange(zoom);
    console.log('bounds change',  bounds);
  }

  _onChildMouseEnter = (key /*, childProps */) => {
    this.props.onHoverKeyChange(key);
  }

  _onChildMouseLeave = (/* key, childProps */) => {
    this.props.onHoverKeyChange(null);
  }

  _onChildClick = (key, childProps) => {

    //debugger;

    // const markerId = childProps.marker.get('id');
    // const index = this.props.markers.findIndex(m => m.get('id') === markerId);
    //
    // if (this.props.onChildClick) {
    //   this.props.onChildClick(index);
    // }

    //console.log('markerId', markerId, index);

    debugger;
    this.props.onCenterChange([childProps.lat, childProps.lng]);

    //console.log('child click', childProps.lat, childProps.lng);
  }

  render() {

    const places = this.props.providers.map(provider => {
      const {id, addresses} = provider;

        return (
          <Marker
            key={id}
            lat={addresses[0].lat}
            lng={addresses[0].lng}
            text={id}
            //bgColor={index % 2 ? '#ff81ca' : '#96aff8'}
            hover={this.props.hoverKey === id}
          />
        )
      }
    )

    return (
      <GoogleMap
        bootstrapURLKeys={MAP.SETTINGS}
        // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
        options={this.createMapOptions}
        center={this.props.center}
        zoom={this.props.zoom}
        hoverDistance={K_SIZE / 2}
        onBoundsChange={this._onBoundsChange}
        onChildClick={this._onChildClick}
        onChildMouseEnter={this._onChildMouseEnter}
        onChildMouseLeave={this._onChildMouseLeave}
      >

        {places}

      </GoogleMap>
    );
  }
}

export default controllable(GMap, ['center', 'zoom', 'hoverKey', 'clickKey'])