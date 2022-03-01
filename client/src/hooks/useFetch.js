import { useState } from "react";

const useFetch = () => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = (config) => {
    fetch(config.url, {
      method: !config.method ? "GET" : config.method,
      body: !config.body ? null : JSON.stringify(config.body),
      headers: {
        "Authorization": "Bearer " + config.token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setResult(result);
        console.log(result);
        if (config.fn) {
          config.fn(result);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return {
    sendRequest,
    result,
  };
};

export default useFetch;
