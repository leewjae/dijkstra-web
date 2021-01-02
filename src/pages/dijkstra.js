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


class Dijkstra extends React.Component {
  render() {
    return (
      <Container>
        <textarea id = "number-of-nodes">
          
        </textarea>
        <button title = "submit" onClick = {generate_value_matrix()}>
          
        </button>
        Random generated number is {Distance_Generator()}
      </Container>
    )
  }
}

export default Dijkstra