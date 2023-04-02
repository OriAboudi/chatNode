const indexR = require("./index");
const usersR = require("./users");



exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);


}