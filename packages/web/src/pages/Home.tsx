import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";

export const Home: React.FC = () => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/timthedev07/typeorm-react-auth-boilerplate/master/README.md",
      { method: "GET" }
    )
      .then((response) => response.text())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Markdown>{data}</Markdown>
    </div>
  );
};
