import config from "../config";
import EventEmitter from "eventemitter3";

const EVENTS = {
  APP_READY: "app_ready",
};

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application extends EventEmitter {
  constructor() {
    super();

    this.config = config;
    this.data = {
      count: 0,
      planets: [],
    };

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

    //this.emit(Application.events.APP_READY);

    fetch(`https://swapi.booost.bg/api/planets/`)
      .then((resp) => resp.json())
      .then((data) => {
        this.data.count = data.count;
        const promiseArray = [];
        for (let i = 1; i <= this.data.count; i++) {
          const promise = fetch(
            `https://swapi.booost.bg/api/planets/${i}`
          ).then((resp) => resp.json());
          promiseArray.push(promise);
        }

        Promise.all(promiseArray).then((planets) => {
          this.data.planets = planets;
          this.emit(Application.events.APP_READY);
        });
      });
  }
}
