"use client";
import React, {useState} from "react";
import styles from "./page.module.scss";
import {HighlightWithinTextarea} from "react-highlight-within-textarea";


const count = (str: string, regEx: RegExp) => {
  // get array of all matching words
  let arr = str.match(regEx) || [];
  console.log(arr);

  // save / count word occurence
  const map = new Map<string, number>();
  for (let i of arr) {
    i = i.toLowerCase();
    map.set(i, map.get(i) === undefined ? 1 : map.get(i)! + 1);
  }

  // sort by number or alphabetical of number is the same
  const sortedArray = Array.from(map.entries()).sort(([aName, aNumber], [bName, bNumber]) => {
    if (aNumber === bNumber) {
      if (aName < bName) return -1;
      return 1;
    } else if (aNumber > bNumber) return -1;
    return 1;
  });

  // create react display
  let list = sortedArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });
  return <ol>{list}</ol>;
};
export default function Home() {
  const [hardSkills, setHardSkills] = useState([
    "html",
    "html5",
    "css",
    "javascript",
    "css3",
    "document",
    "API",
    "responsive",
    "react",
    "react.js",
    "angularJS",
    "node.js",
    "server-side rendering",
    "SSR",
    "UI",
    "git",
    "github",
    "restful apis",
    "Angular 7+",
    "MySQL",
    "Laravel",
    "PHP",
    "SQL",
    "AWS",
    "rest api",
  ]);
  const [softSkills, setSoftSkills] = useState(["collaborate", "team player", "organized"]);
  const [otherKeyWords, setOtherKeyWords] = useState([
    "develop",
    "developer",
    "development",
    "optimize",
    "database",
    "test",
    "tests",
    "front end",
    "front-end",
  ]);
  const [value, setValue] = useState("");
  const onChange = (value) => setValue(value);

  const hardSkillsRegEx = new RegExp(`\\b${hardSkills.join("\\b|\\b")}\\b`, "gi");
  const softSkillsRegEx = new RegExp(`\\b${softSkills.join("\\b|\\b")}\\b`, "gi");
  const otherRegEx = new RegExp(`\\b${otherKeyWords.join("\\b|\\b")}\\b`, "gi");

  return (
    <main className={styles.main}>
      <div style={{display: "flex", gap: "100px"}}>
        <div className={styles.HighlightAreaWrap}>
          <h2>Job Description</h2>
          <HighlightWithinTextarea
            value={value}
            highlight={[
              {
                highlight: hardSkillsRegEx,
                className: styles.red,
              },
              {
                highlight: softSkillsRegEx,
                className: styles.blue,
              },
              {
                highlight: otherRegEx,
                className: styles.yellow,
              },
            ]}
            onChange={onChange}
          />
        </div>
        <div className={styles.keywordsLists}>
          <div>
            <b>Hard Skills</b>
            {count(value, hardSkillsRegEx)}
          </div>
          <div>
            <b>Soft Skills</b>
            {count(value, softSkillsRegEx)}
          </div>
          <div>
            <b>Other keywords</b>
            {count(value, otherRegEx)}
          </div>
        </div>
      </div>
      <div className={styles.regExList}>
        <h3>Hard Skills RegEx</h3>
        <p className={styles.plainRegEx}>{hardSkillsRegEx.toString()}</p>
        <h3>Soft Skills RegEx</h3>
        <p className={styles.plainRegEx}>{softSkillsRegEx.toString()}</p>
        <h3>Other RegEx</h3>
        <p className={styles.plainRegEx}>{otherRegEx.toString()}</p>
      </div>
    </main>
  );
}
