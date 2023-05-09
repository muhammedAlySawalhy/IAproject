import React, { useState, useEffect } from "react";
import { z } from "zod";
function withDataPosting(WrappedComponent, url) {
  return function WithDataPosting(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const postData = async (payload) => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000${url}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const responseData = await response.json();
        if (!response.ok) {
          if (responseData instanceof z.ZodError) {
            const errors = responseData.errors.map((error) => {
              const path = error.path.join(".");
              return `${path}: ${error.message}`;
            });
            setError(errors);
          }
          setError(responseData.message);
        } else {
          setData(responseData);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      if (error) {
        const timeoutId = setTimeout(() => {
          setError("noError");
        }, 5000);
        return () => clearTimeout(timeoutId);
      }
    }, [error]);

    return (
      <WrappedComponent
        postData={postData}
        data={data}
        loading={loading}
        error={error}
        {...props}
      />
    );
  };
}

export default withDataPosting;
