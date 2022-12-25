const { sign, verify } = require("jsonwebtoken")
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://slotim:geslo123@footballappcluster.fcikhci.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri);

const handler = async (event) => {
    // POST
    if (event.httpMethod == "POST") {
        const clientPromise = mongoClient.connect();
        let reqData = JSON.parse(event.body)
        const database = (await clientPromise).db("userDB");
        const collection = database.collection("users");
        const cursor = await collection.find({ code: reqData.code })
        var users = await cursor.toArray();
        var user = users[0]
        if (!user || user.registered == true) {
            try {
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Access-Control-Allow-Methods": "*"
                        
                    },
                    body: JSON.stringify({username: null})
                }
            } catch (error) {
                return { statusCode: 501, body: error.toString() }
            } finally {
                (await clientPromise).close()
              }
        } else {
            try {
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Access-Control-Allow-Methods": "*"
                        
                    },
                    body: JSON.stringify({username: user.username})
                }
            } catch (error) {
                return { statusCode: 501, body: error.toString() }
            } finally {
                (await clientPromise).close()
              }
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