import React, { useState, useEffect } from "react";

function withDataFetching(WrappedComponent, url) {
  return function WithDataFetching(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const prefix = "http://localhost:5000";
    let sent = prefix + url;
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(sent);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const responseData = await response.json();
          setData(responseData);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }
      fetchData();
    }, [url]);

    return (
      <div>
        {loading && <p>Loading data...</p>}
        {error && <p>There was an error fetching data.</p>}
        {!loading && !error && <WrappedComponent data={data} {...props} />}
      </div>
    );
  };
}

export default withDataFetching;
