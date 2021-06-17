import axios from "axios";
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
};
const GraphTBL = ({ url }: GraphTBLProps) => {
  const [arrayOfTypes, setArrayOfTypes] = useState<TypesArray>({
    apiTypes: [],
    status: "loading",
  });

  const go = async () => {
    try {
      const typesData = await fetchApiInfo(url);
      setArrayOfTypes({
        ...arrayOfTypes,
        status: "success",
        apiTypes: typesData,
      });
    } catch (err) {
      console.log(err);
      setArrayOfTypes({ ...arrayOfTypes, status: "error" });
    }
  };

  useEffect(() => {
    go();
  }, [url]);

  switch (arrayOfTypes.status) {
    case "loading":
      return <span>Loading</span>;
    case "error":
      return <span>Oops</span>;
    case "success":
      return (
        <div style={{ height: "fit-content" }}>
          <ul
            style={{
              maxHeight: "300px",
              overflow: "scroll",
              listStyle: "none",
            }}
          >
            {arrayOfTypes.apiTypes.map((type, index) => (
              <li key={index}>{type.name}</li>
            ))}
          </ul>
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

const fetchApiInfo = async (endpoint: string): Promise<GraphQLSchema[]> => {
  const data = await axios({
    url: endpoint,
    method: "post",
    data: {
      query: query,
    },
  });

  const typesArray = data.data.data.__schema.types;
  console.log("API INFO", typesArray);
  return typesArray;
};
