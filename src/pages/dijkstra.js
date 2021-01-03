import React from "react"
import {Container} from "reactstrap"

function Distance_Generator() {
  return getRandomInt(-1, 100)
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var result = Math.floor(Math.random() * (max - min)) + min;

  if (result !== 0) {
    return result
  } else {
    getRandomInt(min, max)
  }
}

function generate_value_matrix(nodes) {
  var distance_matrix = new Array(nodes)
  for (var i = 0; i < nodes; i++) {
      var temp_array = new Array(nodes)
    for (var j = 0; j < nodes; j++) {
      temp_array[j] = Distance_Generator();
    }
      distance_matrix[i] = temp_array;
  }
}

class node {
  constructor(index) {
    this.visited= false;
    this.best_parent = "";
    this.index = index
  }
}

class priority_queue {

  constructor() {
    this.queue = new Array();
  }
}

class Dijkstra extends React.Component {

  state = {
    number : 0
  }

  enter_key_detect = (e) => {
    if (e.key === 'Enter') {
        this.setState({
          number : e.target.value
        })
    }
  }

  render() {
    return (
      <Container>
        <input type="text" placeholder = {this.state.number} onKeyDown = {this.enter_key_detect}/> 
        <br />
        Please Enter Number of Nodes {this.state.number}
        
      </Container>
    )
  }
}

export default Dijkstra