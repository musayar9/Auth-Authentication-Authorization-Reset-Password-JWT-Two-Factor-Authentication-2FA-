import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {Helmet} from "react-helmet"
const Home = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Helmet>
        <title>Auth-OTP-JWT</title>
        <meta name="description" content="Home" />
      </Helmet>

      <div className="mx-auto max-w-3xl  py-12 px-4 ">
        <div className="flex flex-col items-center gap-4">
          <div className="space-y-2">
            <h2 className="font-bold text-2xl text-zinc-700 tracking-widest">
              Two Factor Authentication - OTP
            </h2>
            <p className="text-md indent-4 text-zinc-600  font-semibold">
              A one-time password (OTP) is a valid password for a login or
              transaction on a computer system or other digital device. There is
              no shortage of parts in OTP, with the traditional (static)
              password being maintained with its built-in identity.
              Additionally, through a number of applications, OTP includes
              two-factor authentication that can be accessed by a smart card or
              devices that a person may have, such as a mobile phone, or filled
              with a PIN that only that person knows.
            </p>
            <p className="text-md indent-4 text-zinc-600  font-semibold">
              Multi-factor authentication (MFA) allows a computer user to
              successfully double or decrease part replacement rates. an
              authentication by which access is granted to provide further
              evidence method: knowledge is something that one knows only that
              one has learned, ownership is something that the student has and
              only the student, and inheritance It is something that the student
              and only the student is involved in. Two-factor identification A
              variant of multiple authentication, also known as 2FA or its
              subgroup. Users can use their identities in two different It is
              the validation configuration using the configuration of the
              factor.
            </p>

            <ul className="list-decimal pl-4 italic  text-zinc-600 font-semibold">
              <li>User something known</li>
              <li>something the user has</li>
              <li>Something the user is.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-2xl text-zinc-700 ">
              What is JSON Web Token?
            </h2>
            <p className="text-md indent-4 text-zinc-600  font-semibold">
              JSON Web Token (JWT) is an open standard (RFC 7519) that defines a
              compact and self-contained way for securely transmitting
              information between parties as a JSON object. This information can
              be verified and trusted because it is digitally signed. JWTs can
              be signed using a secret (with the HMAC algorithm) or a
              public/private key pair using RSA or ECDSA. Although JWTs can be
              encrypted to also provide secrecy between parties, we will focus
              on signed tokens. Signed tokens can verify the integrity of the
              claims contained within it, while encrypted tokens hide those
              claims from other parties. When tokens are signed using
              public/private key pairs, the signature also certifies that only
              the party holding the private key is the one that signed it.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-zinc-700">
                  When should you use JSON Web Tokens?
                </h3>
                <button
                  className="pr-2 text-zinc-600"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaArrowUp /> : <FaArrowDown />}
                </button>
              </div>
              {show && (
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-zinc-700 ">
                    Here are some scenarios where JSON Web Tokens are useful:
                  </h4>
                  <p className="text-slate-600 font-semibold">
                    <span className="font-bold underline text-zinc-600">
                      Authorization:
                    </span>
                    This is the most common scenario for using JWT. Once the
                    user is logged in, each subsequent request will include the
                    JWT, allowing the user to access routes, services, and
                    resources that are permitted with that token. Single Sign On
                    is a feature that widely uses JWT nowadays, because of its
                    small overhead and its ability to be easily used across
                    different domains.
                  </p>
                  <p className="text-zinc-600 font-semibold">
                    <span className="font-bold underline  text-zinc-600">
                      {" "}
                      Information Exchange:
                    </span>
                    JSON Web Tokens are a good way of securely transmitting
                    information between parties. Because JWTs can be signed—for
                    example, using public/private key pairs—you can be sure the
                    senders are who they say they are. Additionally, as the
                    signature is calculated using the header and the payload,
                    you can also verify that the content hasnt been tampered
                    with.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
