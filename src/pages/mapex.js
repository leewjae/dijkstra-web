import React from "react";
import { Container } from "reactstrap";

// distances : Array of integers
// neighbours : Array of strings
// nearest_neighbour : string
// best_distance : int 
class City {
  constructor(distances, neighbours, nearest_neighbour, best_distance) {
    this.distances = distances;
    this.neighbours = neighbours;
    this.nearest_neighbour = nearest_neighbour;
    this.best_distance = best_distance;
  }
}

// name : name of the city
// distance : distance from its neighbour
// neighbour : its neighbour
class CityCandidate {
  constructor(name, distance, neighbour) {
    this.name = name;
    this.distance = distance;
    this.neighbour = neighbour;
  }
}

// This priority queue is specially designed for this project.
// This will pop the lowest distance from itself.
// this.queue => stores CityCandidate
class Priority_queue { 

  constructor(numer_of_cities) {
    this.queue = new Array(numer_of_cities);
    this.top_index = 0;
  }

  // returns -> nothing
  // this will push CityCandidate to the queue.
  push = (CityCandidate) => {
    for (var x = 0; x < this.queue.length; ++x) {
      if (typeof(this.queue[x]) == 'undefined') { // if something is undefined, put the CityCandidate on the index
        this.queue[x] = CityCandidate;

        // Compare the current smallest distance to the new pushed value.
        if (this.queue[x].distance < this.queue[this.top_index].distance) { //new one is smallest
          this.top_index = x;
        } 
        return;
      }
    }
  }

  //returns -> CityCandidate
  pop = () => { 
    // this will return the CityCandidate.
    // Since splice returns an Array, put [0] at the back
    var return_value = this.queue.splice(this.top_index, this.top_index + 1)[0]; // pop the highest priority

    //reset the priority
    this.top_index = 0;

    for (var x = 0; x < this.queue.length; ++x) {
      if (this.queue[x].distance < this.queue[this.top_index].distance) { 
        this.top_index = x;
      } 
    }

    return return_value;
  }

  //returns -> the smallest CityCandidate
  top = () => {
    return this.queue[this.top_index];
  }

  //returns -> nothing
  empty = () => {
    for (var x = 0; x < this.queue.length; ++x) {
      if (typeof(this.queue[x]) !== 'undefined') { // if something is defined 
        return false
      }
    }
    return true
  }
}

// This will receive parameter max
// No zero distance will be allowed.
// Negative Value represents that the cities are not connected.
// RETURNS: AN INTEGER
function generate_distance() {
  let probability_city_connected = 0.9;
  let max = 10; // Adjust here for maximum distance between the cities.

  if (Math.random() > probability_city_connected) 
  { // if the random generated number > percentage, the city will not be connected
    return -1 // not connected
  } 
  else 
  {
    return Math.ceil(Math.random() * max);
  }
}

// This will Randomly Generate 
// 1. distances (array<int>)
// 2. nodes (array<string>)
// 3. every_city (array<City>)
// Receive a param. numer_of_cities<int>

function starter(number_of_cities) {
  var every_city = {};
  let nearest_neighbour = "";
  let best_distance = -1;
  for (var i = 0; i < number_of_cities ; ++i) {
    var distances = new Array(number_of_cities);
    var neighbours = new Array(number_of_cities);
    for (var j = 0; j < number_of_cities; ++j) {
      if (i === j) { // same city is not connected.
        distances[j] = -1;
      } else {
        distances[j] = generate_distance();
      }
        neighbours[j] = "city " + j;
    }
    every_city["city" + i] = new City(distances,neighbours,nearest_neighbour, best_distance);
  }

  return every_city
}

// pq : priority_queue
// city : City class
// city_start : string
function add_to_tent(pq, city, city_start) {
    for (var i = 0; i < city.neighbours.length; i++) {
      // It will be pushed into tent only if the cities are connected
      if (city.distances[i] !== -1) {
        var name = city.neighbours[i]; 
        var distance = city.best_weight + city.distances[i]; 
        var neighbour = city_start; 
        var cc = new CityCandidate(name, distance, neighbour);
        pq.push(cc);
        }
      }
}

// 1. every_city : (array<City>)
// 2. city_start : string
// 3. city_end : string

function dijkstra(every_city, city_start, city_end) {

    var pq = new Priority_queue(every_city.length); // this is the tent
    var city;

    // set city -> starting city
    // best_distance -> non negative means already visited.
    for (var i = 0; i < every_city.length; ++i) {
      if (every_city[city_start]) {
        city = every_city[city_start];
        city.best_distance = 0; // visited
        city.nearest_neighbour = "";
      }
    }

    // add city's neighbour to pq.
    add_to_tent(pq, city, city_start);

    while (!pq.empty()) {
      // cc : CityCandidate
      var cc = pq.pop();
      var neighbour;
      for (var i = 0; i < every_city.length; ++i) {
        if (every_city[cc.name]) {
          neighbour = every_city[cc.name];
        }
      }

      //skip visited node
      if (neighbour.best_distance !== -1)
        continue;
      
      neighbour.best_distance = cc.distance;
      neighbour.nearest_neighbour = cc.neighbour;

      if (cc.name === city_end) {
        return true;
      }
        

      //repeat the process
      add_to_tent(pq, neighbour, cc.name);
    }
  return (false);
}

class Stack {
  constructor() {
    this.stack = new Array(0);
  }

  push = (element) => {
    this.stack[this.stack.length] = element;
  }

  pop = () => {
    var value = this.stack[this.stack.length - 1];
    this.stack.length -= 1;
    return value
  }
}


function main() {

  var number_of_cities = window.prompt("Enter the number of cities");
  var every_city = starter(number_of_cities);

  while (true) {
    var from = window.prompt("Enter the starting name (X to quit): ");
    console.log(from)
    if (from === "X" || from === "x") {
      break;
    }
    var to = window.prompt("Enter the ending name (X to quit): ");
    console.log(to)
    if (to === "X" || to === "x") {
      break;
    }
      // Run the calculation
      if (dijkstra(every_city, from, to)) {
          var target = to;
          console.log("The best path between these two people is: ")
          var names = new Stack(); // for name
          names.push(target);

          //update stack until there's no best(start point)
          while(every_city[target].best_parent !== "") { 
            names.push(every_city[target].best_parent);
            target = every_city[target].best_parent;
          }

          //print the stack
          while(!names.empty()){
            var name = names.pop(); // get name
            names.pop(); //pop it
            console.log(name);
          } 

      } else {
        console.log("There is NOT a path between these two people.")
      }
  }

  console.log("Exiting...")
}


export default class Mapex extends React.Component {
  render() {
    return (
      <Container>
      {main()}
    </Container>
    )
  }
}