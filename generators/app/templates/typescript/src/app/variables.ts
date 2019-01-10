import * as _ from "lodash";
import { IVoxaEvent } from "voxa";

/**
 * Variables are the rendering engine way of adding logic into your views
 * See more http://voxa.readthedocs.io/en/latest/views-and-variables.html#variables
 */

// TODO build variables here
export const helloWorld = () => _.sample(['Hello World', 'Hi World', 'Hey World']);
