import React, { Component } from 'react';
import Nav from './Nav'
import SearchArea from './Search';
import firebase from 'firebase'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import logo from './images/LogoMovieDB.png'
import MovieList from './MovieList'


firebase.initializeApp({
  apiKey: " AIzaSyAD-CUtaSINGo4WvDeJzxfG0DQtWZcH5iU",
  authDomain: "flutter-app-edde1.firebaseapp.com "
})


class App extends Component {

  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  constructor() {
    super()
    this.state = {
      movies: [],
      searchTerm: ''
    }
  }


  handleSubmit = (e) => {
    fetch('https://api.themoviedb.org/3/movie/550?api_key=2f951a324e45add5ed2f98f30ce00c45&query=${this.state.searchTerm}')
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({ movies: [...data.results] })
      })
    return false;
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-container">
            <div className="row">
              <section className="col s4 offset-s4">
                <img class="responsive-img" src={logo} />
              </section>
            </div>
          </div>
          <Nav />
        </header>
        <body>
          {this.state.isSignedIn ? (
            <span>
              <div className="body-container">
                <a>Welcome {firebase.auth().currentUser.displayName}</a>
                <button onClick={() => firebase.auth().signOut()} class="waves-effect waves-light btn-large blue darken-4">Sign out!</button>
                <SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
                <MovieList movies={this.state.movies}/>
              </div>
            </span>
          ) : (
              <div>
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </div>
            )}
        </body>
      </div>
    );
  }
}

export default App;
