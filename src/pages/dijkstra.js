import React from "react"
import {Container} from "reactstrap"

//no disconnection
function distance_generator() {
  let min_dist = 0;
  let max_dist = 10;

  return getRandomInt(min_dist, max_dist)
}
// Literally, get Random Integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var result = Math.floor(Math.random() * (max - min)) + min;

  if (result !== 0) {
    return result
  } else { // if there's zero distance, do recursive call.
    getRandomInt(min, max)
  }
}
// Generate number of Random distances and returns an array
function generate_distance_array(nodes) {
  var distance_array = new Array(nodes);
  for (var i = 0; i < distance_array.length ; ++i) {
    distance_array[i] = distance_generator();
  }
} 
//this function will generate sets of Nodes
function generate_set_of_nodes(nodes, distance_matrix) {

  //make nodes
  var node_arr = new Array(nodes);
  for (var i = 0; i < nodes; ++i) {
    var node = new Node("node" + i, distance_matrix[i]);
    node_arr[i] = node;
  }

  return node_arr;

}

function distance_matrix_generator(nodes) {
// _____________
// |-1 1 2 3 4 |
// |1 -1 4 2 1 |
// |2 1 -1 1 2 |
// |3 3 2 -1 4 |
// |5 4 6 4 -1 |
// -------------
// Generated Matrix looks something like this
  var distance_matrix = new Array(nodes);
  for (var i = 0; i < nodes; ++i) {
    var distances_each_node = new Array(nodes);
    for (var j = 0; j < nodes; ++j) {
      if (i === j) { // there will be no distance between the same nodes.
        distances_each_node[j] = -1;
      } else { // if not, there will be distances
        distances_each_node[j] = distance_generator();
      }
    }
    distance_matrix[i] = distances_each_node;
  }

  return distance_matrix;
}

function start_dijkstra(node_array) {
  return console.log(node_array)
}

//will receive the priority que instance and a node instance
function add_to_tent(pq, node, node_array) {
  for (var i = 0; i < node.distance_array.length; ++i) {
    // if it is conntected, (which means it is not disconnected)
    // add to our tent priority queue.
    if (node.distance_array[i] !== -1) { 
      var tent_node = new Tent_Node(node.distance_array[i], node_array[i])
      pq.push(tent_node);
    }
  }
}

class Tent_Node {
  constructor(distance, node) {
    this.distance = distance;
    this.node = node;
  }
}

class Node {
  constructor(name, distance_array) {
    this.visited= false;
    this.name = name;
    this.distances = distance_array;
  }
}
// When the element is being pushed, it will automatically update the top index.
// when the element is being popped, it will automatically update the top index. 
// If the array is empty, it will automatically set the index to 0.

class Priority_queue { //smallest will be executed first

  constructor(node) {
    this.queue = new Array(node);
    this.top_index = 0;
  }

  push = (element) => {
    for (var x = 0; x < this.queue.length; ++x) {
      if (typeof(this.queue[x]) == 'undefined') { // if something is defined 
        this.queue[x] = element;
        if (this.queue[x] < this.queue[this.top_index]) { //new one is smallest
          this.top_index = x;
        } 
        return;
      }
    }
  }

  pop = () => { // delete the top
    var return_value = this.queue.splice(this.top_index, this.top_index + 1)[0]; // pop the highest priority

    //reset the priority
    this.top_index = 0;

    for (var x = 0; x < this.queue.length; ++x) {
      if (this.queue[x] < this.queue[this.top_index]) { //new one is smallest
        this.top_index = x;
      } 
    }

    return return_value;
  }

  top = () => {
    return this.queue[this.top_index];
  }

  empty = () => {
    for (var x = 0; x < this.queue.length; ++x) {
      if (typeof(this.queue[x]) !== 'undefined') { // if something is defined 
        return false
      }
    }
    return true
  }
}

class Dijkstra extends React.Component {

  state = {
    nodes : 0,
    node_array: undefined // this value will store the node instances
  }

  enter_key_detect = (e) => {
    if (e.key === 'Enter') {
        this.setState({
          node_array : generate_set_of_nodes(e.target.value, distance_matrix_generator(e.target.value))
        })
    }
  }

  render() {
    return (
      <Container>
        <input type="text" placeholder = {this.state.nodes} onKeyDown = {this.enter_key_detect}/> 
        <br />
        If you press enter, it will update the distance matrix
        {start_dijkstra(this.state.node_array)}
      </Container>
    )
  }
}

export default Dijkstra