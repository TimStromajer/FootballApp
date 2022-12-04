const { sign, verify } = require("jsonwebtoken")
var CryptoJS = require("crypto-js");
require('dotenv').config()

const handler = async (event) => {
    // GET
    const secret = process.env.SECRET
    if (event.httpMethod == "GET") {
        var passwd = "U2FsdGVkX18Ww24YzlaPbTpf0PNiN3xAxH3ei5xmPpg="
        bytes = CryptoJS.AES.decrypt(passwd, "TopSkrivnost1")
        var decriptedPasswd = bytes.toString(CryptoJS.enc.Utf8)
        console.log(decriptedPasswd)
      try {
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*"
            
          },
          body: JSON.stringify({data: process.env})
        }
      } catch (error) {
          return { 
            statusCode: 200,           
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Methods": "*"
            },
            body: JSON.stringify({data: null})
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