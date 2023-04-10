import React, { useState } from "react";

function withDataPosting(WrappedComponent, url) {
  return function WithDataPosting(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const prefix = "http://localhost:5000";
    let sent = prefix + url;
    async function postData(payload) {
      try {
        setLoading(true);
        const response = await fetch(sent, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const responseData = await response.json();
        if (response.ok) {
          setData(responseData);
        } else {
          setError(responseData);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    return (
      <div>
        <WrappedComponent
          postData={postData}
          data={data}
          loading={loading}
          error={error}
          {...props}
        />
      </div>
    );
  };
}

export default withDataPosting;
