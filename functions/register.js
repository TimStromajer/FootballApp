const { sign, verify } = require("jsonwebtoken")
const { MongoClient } = require("mongodb");
var CryptoJS = require("crypto-js");
const uri = "mongodb+srv://slotim:geslo123@footballappcluster.fcikhci.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri);
require('dotenv').config()

const handler = async (event) => {
    // POST
    const secret = process.env.SECRET
    if (event.httpMethod == "POST") {
      const clientPromise = mongoClient.connect();
      let reqData = JSON.parse(event.body)
      const database = (await clientPromise).db("userDB");
      const usersDB = database.collection("users");
      const cursor = await usersDB.find({ code: reqData.code })
      var codeUsers = await cursor.toArray();
      var codeUser = codeUsers[0]
      
      var salt = CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.random(16));
      passwordHash = CryptoJS.SHA256(reqData.password + salt, secret).toString()
      
      if (!codeUser || codeUser.registered == true) {
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
            return { statusCode: 501, body: error.toString() }
        } finally {
          (await clientPromise).close()
        }
      }
      try {
        await usersDB.updateOne({_id: codeUser._id}, { $set: { registered: true, email: reqData.email, password: passwordHash, salt: salt }})

        delete reqData['code']
        var token = await sign(reqData, secret);
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
          return { statusCode: 502, body: error.toString() }
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