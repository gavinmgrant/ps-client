import React, { Component } from 'react';
import PlaystoreApp from './playstoreApp/playstoreApp';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      psApps: [],
      sort: '',
      genres: '',
      error: null  
    }
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }
  
  setGenres(genres) {
    this.setState({
      genres
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if(this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    if(this.state.genres) {
      params.push(`genres=${this.state.genres}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    console.log(url);

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          psApps: data,
          error: null // resets error state
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, we could not find any apps, please try again.'
        });
      })
  }

  render() {
    const apps = this.state.psApps.map((psApp, i) => {
      return <PlaystoreApp {...psApp} key={i}/>
    })
    return (
      <main>
        <h1>Google Play Store Apps</h1>
        <div>
          <form onSubmit={e => this.handleSubmit(e)}> 
            <label htmlFor="sort">Sort: </label>
              <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
                <option value=" ">None</option>
                <option value="rating">Rating</option>
                <option value="app">App</option>
              </select>
            <label htmlFor="genres">Genres: </label>
              <select id="genres" name="genres" onChange={e => this.setGenres(e.target.value)}>
                <option value=" ">None</option>
                <option value="Action">Action</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Strategy">Strategy</option>
                <option value="Casual">Casual</option>
                <option value="Arcade">Arcade</option>
                <option value="Card">Card</option>
              </select>
              <button type="submit">Search</button>
          </form>
          <div className="error">{ this.state.error }</div>
        </div>
        {apps}    
      </main>
    )
  }

}

export default App;