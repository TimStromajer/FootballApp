const { sign, verify } = require("jsonwebtoken")
const { MongoClient } = require("mongodb");
var CryptoJS = require("crypto-js");
const uri = "mongodb+srv://slotim:geslo123@footballappcluster.fcikhci.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
    // POST
    const secret = process.env.SECRET
    if (event.httpMethod == "POST") {
      let reqData = JSON.parse(event.body)
      const database = (await clientPromise).db("userDB");
      const usersDB = database.collection("users");
      const cursor = await usersDB.find({ username: reqData.username })
      var users = await cursor.toArray();
      var user = users[0]

      if (user) {
        bytes = CryptoJS.AES.decrypt(user.password, secret)
        var decriptedPasswd = bytes.toString(CryptoJS.enc.Utf8)
      }

      if (user && decriptedPasswd === reqData.password) {
        cookieData = {email: user.email, username: user.username, code: user.code}
        var token = await sign(reqData, secret);
        try {
          return {
              statusCode: 200,
              headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": "*",
                  "Access-Control-Allow-Methods": "*"
                  
              },
              body: JSON.stringify({jwt: token})
          }
        } catch (error) {
            return { statusCode: 501, body: error.toString() }
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
              body: JSON.stringify({jwt: null})
            }
          } catch (error) {
              return { statusCode: 502, body: error.toString() }
          }
      }
    // REST
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