import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

// Connect to database, if no errors then connect to web server
// maxPoolsize = max users at once,

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    //initial ref to restaurants collection in db
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
