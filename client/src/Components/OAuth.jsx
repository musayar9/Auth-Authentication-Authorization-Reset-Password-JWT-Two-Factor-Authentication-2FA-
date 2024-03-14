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
    }, 7000);
  }, [error]);

  return (
    <>
      <div className="mt-4 flex  items-center justify-center gap-4 flex-row md:flex-col">
        <GoogleAuth setError={setError} setErrorMessage={setErrorMessage} />

        <GithubAuth setError={setError} setErrorMessage={setErrorMessage} />
      </div>
      {error && (
        <div className=" bg-red-600 text-gray-50 flex flex-col items-center gap-2 rounded-md p-3 mt-2">
          <p className="text-sm">{errorMessage}</p>
          <p className="text-sm">
            This e-mail address was logged in through another account. If you
            want to log in with github, make sure you log out of github.
          </p>
        </div>
      )}
    </>
  );
};

export default OAuth;
