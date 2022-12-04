const { sign, verify } = require("jsonwebtoken")

const handler = async (event) => {
    // GET
    const secret = process.env.SECRET
    if (event.httpMethod == "GET") {
      token = event.headers.token.split("bearer=")[1]
      try {
        data = verify(token, secret)
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*"
            
          },
          body: JSON.stringify({username: data.username})
        }
      } catch (error) {
          return { 
            statusCode: 200,           
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Methods": "*"
            },
            body: JSON.stringify({username: null})
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