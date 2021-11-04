require("dotenv").config();
const Express = require("express");
const db = require("./db");
let sequelize = require("./db");
const app = Express();


// Import middlewares as a bundle
const middlewares = require("./middleware");

// Import controllers as a bundle
const controllers = require("./controllers");

// Parse the body of all requests as JSON
sequelize.sync();
app.use(Express.json());
// app.use(middlewares.CORS)
app.use(require('./middleware/headers'))
app.use("/user", controllers.User);
app.use('/idea', controllers.Idea);
app.use('/comment', controllers.Comment)

const resetDatabase = {force:true}
db.authenticate()
// add a resetDatabase inside the db.sync to drop all your tables if needed
// example:  .then(() => db.sync(resetDatabase))
  .then(() => db.sync())
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening on ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });
