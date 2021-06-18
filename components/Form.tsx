import React, { useState } from "react";
import { useEffect } from "react";
import GraphTBL from "./GraphTBL";

const Form = () => {
  const [url, setUrl] = useState({ link: "" });
  const [currentEndpoint, setCurrentEndpoint] = useState({ link: "" });
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault(); // don't redirect the page
    const target = e.target as typeof e.target & {
      url: { value: string }; //assert type cause we know what we get
    };
    setCurrentEndpoint({ ...currentEndpoint, link: target.url.value });
    console.info("Set currentEndpoint to:", target.url.value);
  };

  useEffect(() => {}, [currentEndpoint]);

  return (
    <div>
      <div className="py-4 flex-1 flex justify-center">
        <form
          className="flex-1 flex items-center justify-center"
          onSubmit={onSubmit}
        >
          <label className="font-bold px-4" htmlFor="url">
            URL:
          </label>
          <input
            id="url"
            type="text"
            autoComplete="url"
            required
            className="border-2 border-purple-600"
            onChange={(e) => setUrl({ ...url, link: e.target.value })}
          />

          {url.link.match(regex) ? (
            <button
              type="submit"
              className="text-2xl font-bold px-4 rounded-md mx-4 border-2 border-black hover:text-white hover:bg-black hover:shadow-lg"
            >
              Fetch!
            </button>
          ) : (
            <div>
              <button
                className="text-2xl font-bold px-4 rounded-md mx-4 border-2 border-black hover:text-white hover:bg-black hover:shadow-lg"
                disabled={true}
                type="submit"
              >
                Fetch!
              </button>
              <span style={{ color: "red" }}>Please input a valid URL</span>
            </div>
          )}
        </form>
      </div>
      {currentEndpoint.link !== "" ? (
        <GraphTBL url={currentEndpoint.link} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Form;

// --------- HELPERS ---------

const expression =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

const regex = new RegExp(expression);
