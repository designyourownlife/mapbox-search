import React, {Component} from 'react';
import './Search.css'

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: "", 
      isLoading: false
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();

    // default public token
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.value}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`

    fetch(url)
      .then(response => response.json())
      .then(data => {

        const places = this.props.app.state.places;
        const firstResult = data.features[0]

        places.push({
          name: this.state.value, 
          latitude: firstResult.center[1], 
          longitude: firstResult.center[0]
        })

        this.props.app.setState({
          places: places
        })

        this.setState({
          value: ""
        })

      })

    
  }

  render() {

    return(
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.value} onChange={this.handleChange} placeholder="Add place …"   />
      </form>
    )
  }

}

export default Search;