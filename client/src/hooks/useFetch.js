import { useState } from "react";

const useFetch = (dispatch) => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = (
    config,
    continueFetching = false,
    reconstruct = false
  ) => {
    const authHeaders = {
      "Authorization": "Bearer " + config.token,
      "Content-Type": "application/json",
    };
    setIsLoading(true);
    fetch(config.url, {
      method: !config.method ? "GET" : config.method,
      body: !config.body ? null : JSON.stringify(config.body),
      headers: config.auth && authHeaders,
    })
      .then((response) => {
        setIsLoading(true);
        return response.json();
      })
      .then((data) => {
        if (!continueFetching) {
          if (config.reconstruct) {
            setResult();
          } else {
            setResult(data);
            if (config.fn) {
              dispatch(config.fn(result));
            }
          }
        } else {
          setResult((prevResult) => {
            return [...prevResult, result];
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  return {
    sendRequest,
    result,
    error,
    isLoading,
  };
};

export default useFetch;
