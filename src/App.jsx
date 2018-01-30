import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    };
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    //Obtained by running app in web-api.../authorization_code/ directory and logging in to Spotify
    var accessToken =
      'BQA_4TBDtLBtnSH8kOG5JFq22bo2OLeb6TMZ1KLKDra1aaEJpVa0d-E2bg7GOSj7DcZssa15Cuw8r69QJHt8BNgzAfuO3zhkKaINOML_9UplUaU8YuQCOY4UcgqywEt0fOGSF6rJCKgWhqUhoj3JyIfzN9-ZG8JH8C0j4pE2PgNc-eVpRQ';
    //var myHeaders = new Headers();

    var myOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(res => res.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({ artist });

        FETCH_URL = ` ${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
        fetch(FETCH_URL, myOptions)
          .then(response => response.json())
          .then(json => {
            const { tracks } = json;
            this.setState({ tracks });
          });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an artist"
              value={this.state.query}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {this.state.artist !== null ? (
          <div>
            <Profile artist={this.state.artist} />
            <Gallery tracks={this.state.tracks} />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default App;
