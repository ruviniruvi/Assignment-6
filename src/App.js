import React, { Component } from 'react';
import './App.css';



function CitySearch(props) {
  return (
  <div className="container">
        <div className="city-name-header">
          <h3>{props.data.City}, {props.data.State}</h3>
        </div>
        <div className="city-name-body">
          <ul>
            <li>State:  {props.data.State}</li>
            <li>Location: ({props.data.Lat}, {props.data.Long})</li>
            <li>Population (estimated): {props.data.EstimatedPopulation}</li>
            <li> Total Wages: {props.data.TotalWages}</li>
          </ul>
        </div>
      </div>
      
 
  );
}

function ZipSearch(props) {
  return (
   
    <div className="zip-bar"> 
        <label>
          Zip Code :
          <input type="text" onChange={props.zipCode} value={props.zipValue}/>
        </label>
    </div>
    
  );
}

class App extends Component {
  state = {
    inputZip: "",
    cityResults: [],
  }

  handleZipChange(event){
    this.setState({inputZip: event.target.value});
    if(event.target.value.length === 5){
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + event.target.value)
      .then(res => res.json())
      .then(jsonData => {
        this.setState({
          cityResults: jsonData,
        })
      })
      .catch(err => {
        this.setState({cityResults: [] })
      })
    }
    else{
      this.setState({cityResults: []});
    }
  }

  render() {
    console.log(this.state.cityResults);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code And City Search</h2>
        </div>
        <ZipSearch zipCode={(e) => this.handleZipChange(e)} zipValue={this.state.inputZip}/>
        <div>
          {this.state.cityResults.map(
            (item, index) => {return <CitySearch data={item} key={index}/>;}
          )}
        </div>
      </div>
    );
  }
}


export default App;
