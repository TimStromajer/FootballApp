const { sign, verify } = require("jsonwebtoken")

const handler = async (event) => {
    // GET
    const secret = process.env.SECRET
    if (event.httpMethod == "GET") {
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