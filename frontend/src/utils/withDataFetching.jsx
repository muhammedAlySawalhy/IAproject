import React, { useState, useEffect } from "react";

function withDataFetching(WrappedComponent, url) {
  return function WithDataFetching(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000${url}`);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const responseData = await response.json();
          setData(responseData);
          setLoading(false);
        } catch (error) {
          setError(err.message);
        }
      };
      fetchData();
    }, [url]);

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>There was an error fetching data.</p>;
    return <WrappedComponent data={data} {...props} />;
  };
}

export default withDataFetching;
