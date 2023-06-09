"use client";
import {useState} from "react";
import {HighlightWithinTextarea} from "react-highlight-within-textarea";
import KeywordDisplay from "./Components/KeywordDisplay/KeywordDisplay";
import styles from "./page.module.scss";

// TODO
// copy top skills to plain text for easy pasting into resume
// keyword alias's should be show in the count too. So a break down (5 react (3react, 2react.js)) etc.
//  - have most common alias shown by default
// filter highlight by specific keyword(s)

// sort by number or alphabetical of number is the same
function sortMap(map: Map<string, number>) {
  const sortedArray = Array.from(map.entries()).sort(([aName, aNumber], [bName, bNumber]) => {
    if (aNumber === bNumber) {
      if (aName < bName) return -1;
      return 1;
    } else if (aNumber > bNumber) return -1;
    return 1;
  });
  return sortedArray;
}

type keywords = {displayName: string; aliases: string[]};
function countKeywords(compareStr: string, keywords: keywords[]) {
  const map = new Map<string, number>();

  for (const words of keywords) {
    const regEx = new RegExp(`\\b${words.aliases.join("\\b|\\b")}\\b`, "gi");
    map.set(words.displayName, (compareStr.match(regEx) || []).length);
  }

  return map;
}

// creates the regex for highlighting the keywords
function createKeywordsRegEx(keywords: keywords[]) {
  let arr: string[] = [];
  for (const words of keywords) {
    arr = [...words.aliases, ...arr];
  }
  return new RegExp(`\\b${arr.join("\\b|\\b")}\\b`, "gi");
}

export default function Home() {
  const [value, setValue] = useState("");
  const hardSkills = [
    {displayName: "Angular", aliases: ["angularJS", "Angular 7+", "angular"]},
    {displayName: "API", aliases: ["API"]},
    {displayName: "AWS", aliases: ["AWS"]},
    {displayName: "CSS", aliases: ["css", "css3"]},
    {displayName: "Cypress", aliases: ["cypress"]},
    {displayName: "Docker", aliases: ["docker"]},
    {displayName: "Document", aliases: ["documentation", "document"]},
    {displayName: "Enzyme", aliases: ["enzyme"]},
    {displayName: "Flutter", aliases: ["flutter"]},
    {displayName: "Git", aliases: ["git"]},
    {displayName: "GitHub", aliases: ["github"]},
    {displayName: "Html", aliases: ["html", "html5"]},
    {displayName: "Java", aliases: ["java"]},
    {displayName: "JavaScript", aliases: ["javascript"]},
    {displayName: "Jest", aliases: ["jest"]},
    {displayName: "Kubernetes", aliases: ["kubernetes"]},
    {displayName: "Laravel", aliases: ["Laravel"]},
    {displayName: "MongoDB", aliases: ["mongodb"]},
    {displayName: "MySQL", aliases: ["MySQL"]},
    {displayName: "NodeJS", aliases: ["node.js"]},
    {displayName: "PHP", aliases: ["PHP"]},
    {displayName: "Python", aliases: ["python"]},
    {displayName: "React", aliases: ["reactJS", "react.js", "react"]},
    {displayName: "Responsive", aliases: ["responsive"]},
    {displayName: "RESTful api", aliases: ["rest", "rest api", "restful", "restful api", "restful apis", "restful api's"]},
    {displayName: "SSR", aliases: ["server-side rendering", "SSR", "serverside rendering", "server side rendering"]},
    {displayName: "SQL", aliases: ["SQL"]},
    {displayName: "Testing", aliases: ["test", "tested", "testing"]},
    {displayName: "TypeScript", aliases: ["typescript"]},
    {displayName: "UI/UX", aliases: ["UI", "UX", "UI/UX", "UX/UI"]},
    {displayName: "Vue", aliases: ["vue", "vue.js"]},
  ];
  const softSkills = [
    {displayName: "Collaborate", aliases: ["collaborate", "collaboration"]},
    {displayName: "Organized", aliases: ["organized"]},
    {displayName: "Team player", aliases: ["team player"]},
  ];
  const otherKeywords = [
    {displayName: "Agile", aliases: ["agile"]},
    {displayName: "CI/CD", aliases: ["continuos integration", "continuos delivery", "CI/CD"]},
    {displayName: "Database", aliases: ["database"]},
    {displayName: "Design", aliases: ["design"]},
    {displayName: "Develop", aliases: ["develop", "development"]},
    {displayName: "Devops", aliases: ["devops"]},
    {displayName: "Front end", aliases: ["front end", "front-end"]},
    {displayName: "Optimize", aliases: ["optimize", "optimization"]},
    {displayName: "Scrum", aliases: ["scrum"]},
    {displayName: "Version control", aliases: ["version control"]},
  ];

  const onChange = (value: string) => setValue(value);

  return (
    <main className={styles.main}>
      <div className={styles.contentWrap}>
        <section className={styles.HighlightAreaWrap}>
          <h2>Text to parse</h2>
          <HighlightWithinTextarea
            value={value}
            highlight={[
              {
                highlight: createKeywordsRegEx(hardSkills),
                className: styles.red,
              },
              {
                highlight: createKeywordsRegEx(softSkills),
                className: styles.blue,
              },
              {
                highlight: createKeywordsRegEx(otherKeywords),
                className: styles.yellow,
              },
            ]}
            onChange={onChange}
          />
        </section>
        <section className={styles.keywordsLists}>
          <KeywordDisplay keywords={sortMap(countKeywords(value, hardSkills))} title={"Hard Skills"} highlightColor="#ffc9c9" />
          <KeywordDisplay keywords={sortMap(countKeywords(value, softSkills))} title={"Soft Skills"} highlightColor="#a3daff" />
          <KeywordDisplay
            keywords={sortMap(countKeywords(value, otherKeywords))}
            title={"Other Keywords"}
            highlightColor="#ffec99"
          />
        </section>
      </div>
      <aside className={styles.regExList}>
        <h3>Hard Skills RegEx</h3>
        <p className={styles.plainRegEx}>{createKeywordsRegEx(hardSkills).toString()}</p>
        <h3>Soft Skills RegEx</h3>
        <p className={styles.plainRegEx}>{createKeywordsRegEx(softSkills).toString()}</p>
        <h3>Other RegEx</h3>
        <p className={styles.plainRegEx}>{createKeywordsRegEx(otherKeywords).toString()}</p>
      </aside>
    </main>
  );
}
