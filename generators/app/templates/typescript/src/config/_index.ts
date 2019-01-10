/* tslint:disable:jsdoc-format */

import * as fs from "fs";
import * as path from "path";
import _env from "./env";

const env = _env.toLowerCase();

/**  requires  **/
/**  requires end  **/

const config = fs.readFileSync(path.join(__dirname, `${env}.json`), 'utf8');
const configFile = JSON.parse(config);
configFile.env = env;

/**  plugins  **/
/**  plugins end  **/

export default configFile;
export const asFunction = () => configFile;
