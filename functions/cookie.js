import * as jwt from 'jsonwebtoken';

const handler = async (event) => {
    // GET MSGS
    if (event.httpMethod == "GET") {
      try {
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
      }
    // POST MSG
    } else if (event.httpMethod == "POST") {
      let reqData = JSON.parse(event.body)
      try {
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