// Set response with data
export const setResponse = (data, response) => {
    response.status(200); // Set status code to 200 (OK)
    response.json(data); // Send data as JSON response
  };
  
  // Set error response
  export const setError = (err, response) => {
    response.status(500); // Set status code to 500 (Internal Server Error)
    response.json({
      error: {
        code: "InternalServerError",
        message: "Error occurred while processing the request",
      },
    }); // Send error message as JSON response
  };
  