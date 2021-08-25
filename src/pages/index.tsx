import { css } from "linaria";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Editor } from "../editor";

const Index: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(`Initial content`);

  const handleChange = useCallback((value: string) => {
    console.log({ value });
    setValue(value);
  }, []);

  const handleSaveClick = useCallback(() => {
    localStorage.setItem("value", value);
  }, [value]);

  const handleLoadClick = useCallback(() => {
    const value = localStorage.getItem("value");
    if (value !== null) {
      console.log("get value", value);
      setValue(value);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={container}>
      <Editor value={value} onChange={handleChange} />
      <div>
        <button className={button} onClick={handleSaveClick}>
          save
        </button>
        <button className={button} onClick={handleLoadClick}>
          load
        </button>
      </div>
    </div>
  );
};

export default Index;

const container = css`
  padding: 32px;
`;

const button = css`
  border: none;
  border-radius: 8px;
  background-color: lightgray;
  padding: 1em 1.5em;
  margin-right: 12px;
  &:hover {
    opacity: 0.5;
  }
`;
