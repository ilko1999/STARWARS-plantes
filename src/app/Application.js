import config from '../config';
import EventEmitter from 'eventemitter3';

const EVENTS = {
  APP_READY: 'app_ready',
};

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application extends EventEmitter {
  constructor() {
    super();

    this.config = config;
    this.data = {};
    this.count = 0;
    this.planets = [];

    this.init();
  }

  static get events() {
    return EVENTS;
  }

  

  /**
   * Initializes the app.
   * Called when the DOM has loaded. You can initiate your custom classes here
   * and manipulate the DOM tree. Task data should be assigned to Application.data.
   * The APP_READY event should be emitted at the end of this method.
   */
  async init() {
    // Initiate classes and wait for async operations here.
    // const data = await fetch('https://swapi.booost.bg/api/planets/')
    // console.log(await data.json())


  //  let f = 0;
        
  //  do {
    for(var i = 1; i <= 60; i ++){
      fetch(`https://swapi.booost.bg/api/planets/${i}/`)
        .then((resp) => resp.json())
        .then((data) => {
          //console.log(data)
          //this.count = data.count;
          this.planets.push(data);
          //console.log(this.planets);
          //console.log(data.count);
      }); 
    }
    this.count = i;
    console.log(this.count);
    console.log(this.planets);

    this.emit(Application.events.APP_READY);
  }
}

