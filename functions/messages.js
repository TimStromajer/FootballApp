const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://slotim:geslo123@footballappcluster.fcikhci.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri);

const handler = async (event) => {
    // GET MSGS
    if (event.httpMethod == "GET") {
      const clientPromise = mongoClient.connect();
      try {
        const database = (await clientPromise).db("MessagesDB");
        const collection = database.collection("messages");
        const cursor = await collection.find()
        var msgs = await cursor.toArray();
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: JSON.stringify(msgs)
        }
      } catch (err) {
        console.log(err)
      } finally {
        (await clientPromise).close()
      }
    // POST MSG
    } else if (event.httpMethod == "POST") {
      const clientPromise = mongoClient.connect();
      let reqData = JSON.parse(event.body)
      try {
        const database = (await clientPromise).db("MsgDatabase");
        const collection = await database.collection("messages");

        collection.insertOne({
            username: reqData.username,
            text: reqData.text,
            time: reqData.time
        })
  
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: JSON.stringify({message: "added :)"})
        }
      } catch (error) {
          return { statusCode: 500, body: error.toString() }
      } finally {
        (await clientPromise).close()
      }
    } else {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "*"
        },
        body: JSON.stringify({message: "hi"})
      }
    }
  }
  
  module.exports = { handler }