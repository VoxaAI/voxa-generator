import * as path from "path";
import * as _env from "./env";

const env = _env.toLowerCase();

/*******  requires  *******/
/*****  requires end *****/

import * as configFile from path.join(__dirname, `${env}.json`);
configFile.env = env;

/*******  plugins  *******/
/*****  plugins end *****/

export default configFile;
export const asFunction = () => configFile;
