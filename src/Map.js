import React, {Component} from 'react';
import mapbox from 'mapbox-gl';
import './Map.css';

class Map extends Component {
  
  componentDidMount() {

    const app = this.props.app;
    
    const map = new mapbox.Map({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      container: 'map',
      style: app.state.style,
      center: [ app.state.longitude, app.state.latitude ],
      zoom: 12
    });

    const navigationControl = new mapbox.NavigationControl()
    
    map.addControl(navigationControl)

    app.setState({
      map: map
    })

  }
  
  render() {

    const app = this.props.app;
    const map = app.state.map;
    const style = app.state.style;

    if(map) {
      map.setStyle(style)
    }

    return (
      <div id="map"></div>
    )
  }

}

export default Map;