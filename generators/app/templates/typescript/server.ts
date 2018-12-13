import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as http from "http";
import * as Raven from "raven";
import * as uuid from "uuid";
import * as _ from "lodash";

Raven.config().install();

const router = express.Router();
import {
  alexaSkill,
  // botframeworkSkill,
  dialogflowAction
} from "./src/app";

console.log(
  `${"Attempting to start.\r\n\tNode version: "}${
    process.version
  }\r\n\tNODE_ENV: ${process.env.NODE_ENV}`
);

const app = express();
app.use(Raven.requestHandler());

app.all("/*", (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://ask-ifr-download.s3.amazonaws.com"
  );
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.use(morgan("dev"));

// req.body is, by default, undefined, and is populated when you
// use body-parsing middleware such as body-parser and multer.
// more http://expressjs.com/en/api.html#req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

_.forEach(
  {
    alexa: alexaSkill,
    // botframework: botframeworkSkill,
    dialogflow: dialogflowAction
  },
  (platform, platformPath) => {
    if (!platform) {
      return;
    }

    console.log(
      `Enabling /${platformPath} endpoint for ${platform.constructor.name}.`
    );
    router.post(`/${platformPath}`, (req, res, next) => {
      function callback(err, msg?) {
        if (err) {
          console.error(err.message ? err.message : err);
          return next(err);
        }

        return res.json(msg);
      }

      const context = {
        fail: err => callback(err),
        succeed: msg => callback(null, msg),
        awsRequestId: uuid.v4(),
        done: callback
      };

      platform
        .execute(req.body, {})
        .then(context.succeed)
        .catch(context.fail);
    });
  }
);

app.use(router);

// The error handler must be before any other error middleware
app.use(Raven.errorHandler());

const server = http.createServer(app);
server.listen(3000, () => {
  console.log("Server listening on port 3000.");
});
