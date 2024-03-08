import { useState, useEffect } from "react";
import GithubAuth from "../OAuth/GithubAuth";

import GoogleAuth from "../OAuth/GoogleAuth";
const OAuth = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setError(false);
      setErrorMessage(null);
    }, 3000);
  }, [error]);

  return (
    <>
      <div className="mt-4 flex  items-center justify-center gap-4 flex-row md:flex-col">
        <GoogleAuth setError={setError} setErrorMessage={setErrorMessage} />

        <GithubAuth setError={setError} setErrorMessage={setErrorMessage} />
      </div>
      {error && (
        <div className="bg-red-600 text-xs text-white rounded-md p-4 mt-3">
          <p className="text-md font-semibold">{errorMessage}</p>
        </div>
      )}
    </>
  );
};

export default OAuth;
