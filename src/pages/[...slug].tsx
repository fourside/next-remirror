import { css } from "linaria";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Editor } from "../editor";

const IdPage: NextPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(`Initial content`);

  const slug = router.query["slug"];
  if (slug !== undefined && !Array.isArray(slug)) {
    throw new Error("slug query is not array or undefined");
  }

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

  if (slug === undefined) {
    return <div>loading</div>;
  }

  return (
    <div className={container}>
      <h1 className={title}>remirror editor: id: {slug[0]}</h1>
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

export default IdPage;

const container = css`
  padding: 32px;
`;

const title = css`
  font-weight: normal;
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
