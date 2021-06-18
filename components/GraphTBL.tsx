import axios, { AxiosError } from "axios";
import { ErrorInfo } from "react";
import { useState } from "react";
import { useEffect } from "react";

type GraphTBLProps = {
  url: string;
};

type SchemaFields = any;

type GraphQLSchema = {
  name: string;
  fields: SchemaFields[];
  description: string;
};

type TypesArray = {
  apiTypes: GraphQLSchema[];
  status: "loading" | "error" | "success";
  errorDesc?: {
    msg: string;
    statusCode: number;
  };
};
const GraphTBL = ({ url }: GraphTBLProps) => {
  const [arrayOfTypes, setArrayOfTypes] = useState<TypesArray>({
    apiTypes: [],
    status: "loading",
  });

  const go = async () => {
    setArrayOfTypes({ ...arrayOfTypes, status: "loading" });
    const typesData = await fetchApiInfo(url);

    if (typesData.statusCode !== 200) {
      return setArrayOfTypes({
        ...arrayOfTypes,
        status: "error",
        errorDesc: {
          msg: typesData.statusText,
          statusCode: typesData.statusCode,
        },
      });
    }
    return setArrayOfTypes({
      ...arrayOfTypes,
      status: "success",
      apiTypes: typesData.typesArray,
    });
  };

  useEffect(() => {
    go();
  }, [url]);

  switch (arrayOfTypes.status) {
    case "loading":
      return (
        <div className="flex-grow px-5 py-5 border text-center font-black text-5xl">
          <div className="lds-ellipsis">
            <div>°</div>
            <div>°</div>
            <div>°</div>
          </div>
        </div>
      );
    case "error":
      return (
        <div className="bg-gradient-to-r from-purple-300 to-blue-200">
          <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
              <div className="border-t border-gray-200 text-center pt-8">
                <h1 className="text-9xl font-bold text-purple-400">
                  {arrayOfTypes.errorDesc?.statusCode}
                </h1>
                <h1 className="text-6xl font-medium py-8">oops!</h1>
                <p className="text-2xl pb-8 px-12 font-medium">
                  {arrayOfTypes.errorDesc?.msg}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    case "success":
      return (
        <div className="flex flex-row justify-evenly">
          <table>
            <tr>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Choose one schema
              </th>
            </tr>
            {arrayOfTypes.apiTypes.map((type, index) => (
              <tr>
                <td className="border px-8 py-4" key={index}>
                  {type.name}
                </td>
              </tr>
            ))}
          </table>
          <div className="flex-grow">
            <div className="bg-blue-100 border text-left px-8 py-4 w-full font-bold">
              {" "}
              Your table{" "}
            </div>
            <div className="border  text-center px-8 py-4 h-full">Choose</div>
          </div>
        </div>
      );
  }
};

export default GraphTBL;

// --------- HELPERS ---------

const query = `{
    __schema {
        types {
            name
            description
            fields {
                description
                deprecationReason
            }
        }
    }
}`;

type DataArray = {
  typesArray: GraphQLSchema[];
  statusCode?: number | undefined | null;
  statusText: string;
};

const fetchApiInfo = async (endpoint: string): Promise<DataArray> => {
  try {
    const data = await axios({
      url: endpoint,
      method: "post",
      data: {
        query: query,
      },
    });

    const dataArray: DataArray = {
      typesArray: data.data.data.__schema.types,
      statusCode: data.status,
      statusText: data.statusText,
    };
    console.log("API INFO", data);
    return dataArray;
  } catch (err) {
    if (err.message === "Network Error") {
      return {
        statusText: "Network Error - Try checking the URL",
        statusCode: 400,
        typesArray: [],
      };
    }
    return { statusText: err.message, typesArray: [] };
  }
};
