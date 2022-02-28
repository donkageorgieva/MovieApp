import { useState } from "react";

const useHttp = () => {
  const [result, setResult] = useState();
  const sendRequest = (config) => {
    fetch(config.url, {
      method: !config.method ? "GET" : config.method,
      body: !config.body ? null : JSON.stringify(config.body),
      headers: !config.heders
        ? { "Content-Type": "application/json" }
        : config.headers,
    })
      .then((response) => response.json())
      .then((result) => {
        setResult(result);
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

export default useHttp;
