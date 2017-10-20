import React, {Component} from 'react';

import GoogleMapReact from './GoogleMapReact';
import ProvidersList from './ProvidersList';
import request from './middleware/request';


class Providers extends Component {

  constructor() {
    super();

    this.state = {
      providers: [],
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

  handleListItemClick = (provider) => {
    console.log('list item clicked', provider);
  }

  render() {

    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="Providers">
        <h1>Providers</h1>

        <div
          className={'Providers-map'}
          style={{width: '100%', height: '400px'}}>
          <GoogleMapReact providers={this.state.providers}/>
        </div>

        <ProvidersList
          providers={this.state.providers}
          className={'Providers-list'}
          onClick={this.handleListItemClick}
        />


      </div>
    );
  }
}

export default Providers;
