import React, {Component} from 'react';

import GoogleMapReact from './GoogleMapReact';
import ProvidersList from './ProvidersList';
import request from './middleware/request';


class Providers extends Component {

  constructor() {
    super();

    this.state = {
      providers: [],
      activeProviderId: '',
      isLoading: true,
      isError: false,
    };
  }

  fetchProviders = async () => {
    try {
      const response = await request.get(`/api/providers`);

      this.setState({
        providers: response[0].providers,
        isLoading: false,
      });

    } catch (error) {
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  };

  componentDidMount() {
    this.fetchProviders();
  }

  handleListItemClick = (providerId) => {
    console.log('selected provider', providerId);

    this.setState({
      activeProviderId: providerId,
    });
  };

  render() {

    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="Providers">

        <h1>Providers</h1>

        <GoogleMapReact
          className={'Providers-map'}
          providers={this.state.providers}
          activeProviderId={this.state.activeProviderId}
          onClick={this.handleListItemClick}
        />

        <ProvidersList
          className={'Providers-list'}
          providers={this.state.providers}
          activeProviderId={this.state.activeProviderId}
          onClick={this.handleListItemClick}
        />

      </div>
    );
  }
}

export default Providers;
