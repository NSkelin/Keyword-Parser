"use client";
import {useState} from "react";
import {HighlightWithinTextarea} from "react-highlight-within-textarea";
import KeywordDisplay from "./Components/KeywordDisplay/KeywordDisplay";
import styles from "./page.module.scss";
import {createKeywordsRegEx} from "@/utils";

// TODO
// copy top skills to plain text for easy pasting into resume
//  - support custom formatting
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

type keyword = {displayName: string; aliases: string[]};
function countKeywords(compareStr: string, keywords: keyword[]) {
  const map = new Map<string, number>();

  for (const words of keywords) {
    const regEx = new RegExp(`\\b${words.aliases.join("\\b|\\b")}\\b`, "gi");
    map.set(words.displayName, (compareStr.match(regEx) || []).length);
  }

  return map;
}

export default function Home() {
  const [value, setValue] = useState("");
  const hardSkills = [
    {displayName: "Angular", aliases: ["angularJS", "Angular 7+", "angular"]},
    {displayName: "API", aliases: ["API", "APIs", "API's"], haveSkill: true},
    {displayName: "AWS", aliases: ["AWS"], haveSkill: true},
    {
      displayName: "Content Management System",
      aliases: ["content management system", "content management systems", "CMS"],
      haveSkill: true,
    },
    {displayName: "CSS", aliases: ["css", "css3"], haveSkill: true},
    {displayName: "Cypress", aliases: ["cypress"]},
    {displayName: "Docker", aliases: ["docker"]},
    {displayName: "Document", aliases: ["documentation", "document", "well-documented"]},
    {displayName: "Enzyme", aliases: ["enzyme"]},
    {displayName: "Flutter", aliases: ["flutter"]},
    {displayName: "Git", aliases: ["git"], haveSkill: true},
    {displayName: "GitHub", aliases: ["github"], haveSkill: true},
    {displayName: "HTML", aliases: ["html", "html5"], haveSkill: true},
    {displayName: "Java", aliases: ["java"]},
    {displayName: "JavaScript", aliases: ["javascript", "java script"], haveSkill: true},
    {displayName: "Jest", aliases: ["jest"]},
    {displayName: "jQuery", aliases: ["jquery"]},
    {displayName: "JSON", aliases: ["json"], haveSkill: true},
    {displayName: "Kubernetes", aliases: ["kubernetes"]},
    {displayName: "Laravel", aliases: ["Laravel"]},
    {displayName: "Linux", aliases: ["linux"]},
    {displayName: "MongoDB", aliases: ["mongodb"], haveSkill: true},
    {displayName: "MySQL", aliases: ["MySQL"], haveSkill: true},
    {displayName: "Next.js", aliases: ["next", "nextjs", "next.js"], haveSkill: true},
    {displayName: "NodeJS", aliases: ["nodejs", "node.js"], haveSkill: true},
    {displayName: "NPM", aliases: ["npm", "node package manager"], haveSkill: true},
    {displayName: "PHP", aliases: ["PHP"]},
    {displayName: "PostgreSQL", aliases: ["postgres", "postgresql"]},
    {displayName: "Python", aliases: ["python"], haveSkill: true},
    {displayName: "React", aliases: ["reactJS", "react.js", "react"], haveSkill: true},
    {displayName: "Responsive", aliases: ["responsive"], haveSkill: true},
    {
      displayName: "RESTful api",
      aliases: ["rest", "rest api", "restful", "restful api", "restful apis", "restful api's"],
      haveSkill: true,
    },
    {displayName: "Rust", aliases: ["rust"]},
    {displayName: "SCSS", aliases: ["scss", "sass"], haveSkill: true},
    {
      displayName: "SSR",
      aliases: ["server-side rendering", "SSR", "serverside rendering", "server side rendering"],
      haveSkill: true,
    },
    {displayName: "SQL", aliases: ["SQL"]},
    {displayName: "Testing", aliases: ["test", "tested", "testing"]},
    {displayName: "TypeScript", aliases: ["typescript", "type script"], haveSkill: true},
    {displayName: "UI/UX", aliases: ["UI", "UX", "UI/UX", "UX/UI", "user interface", "user interfaces"]},
    {displayName: "Vue", aliases: ["vue", "vue.js"]},
    {displayName: "Windows", aliases: ["windows"]},
    {displayName: "Wordpress", aliases: ["wordpress", "wordpress themes"], haveSkill: true},
    {displayName: "WooCommerce", aliases: ["woocommerce"]},
    {displayName: "XML", aliases: ["xml"]},
    {displayName: "Solidity", aliases: ["solidity"]},
    {displayName: "React Native", aliases: ["react native"]},
    {displayName: "React-Router", aliases: ["react-router", "react router"]},
    {displayName: "Redux", aliases: ["redux"]},
    {displayName: "React Hooks", aliases: ["react hooks"], haveSkill: true},
    {displayName: "ES6", aliases: ["es6"], haveSkill: true},
    {displayName: "Babel", aliases: ["babel"], haveSkill: true},
    {displayName: "webpack", aliases: ["webpack"], haveSkill: true},
    {displayName: "Storybook", aliases: ["storybook"], haveSkill: true},
    {displayName: "Jenkins", aliases: ["jenkins"]},
    {displayName: "Unit-Test", aliases: ["unit-Test"]},
    {displayName: "Integration test", aliases: ["integration test"]},
    {displayName: "Ajax", aliases: ["ajax"]},
    {displayName: "Dart", aliases: ["dart"]},
    {displayName: "Figma", aliases: ["figma"], haveSkill: true},
    {displayName: "GitLab", aliases: ["gitLab"]},
    {displayName: "BitBucket", aliases: ["bitbucket"]},
    {displayName: "Kotlin", aliases: ["kotlin"]},
    {displayName: "Go", aliases: ["go"]},
    {displayName: "SEO", aliases: ["seo"], haveSkill: true},
    {displayName: "Less", aliases: ["less"]},
    {displayName: "Jira", aliases: ["jira"]},
    {displayName: "Tailwind", aliases: ["tailwind"]},
    {displayName: "Mui", aliases: ["mui", "material ui"]},
    {displayName: "uWSGL", aliases: ["uwsgl"]},
    {displayName: "Gunicorn", aliases: ["gunicorn"]},
    {displayName: "Apache", aliases: ["apache"]},
    {displayName: "Nginx", aliases: ["nginx"]},
    {displayName: "Django", aliases: ["django"]},
    {displayName: "Flask", aliases: ["flask"]},
    {displayName: "Webflow", aliases: ["webflow"]},
    {displayName: "TDD", aliases: ["TDD", "test driven development", "test-driven development"]},
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
    {displayName: "Develop", aliases: ["develop", "development", "developing"]},
    {displayName: "Devops", aliases: ["devops"]},
    {displayName: "Front end", aliases: ["frontend", "front end", "front-end", "front end developer", "front end developer's"]},
    {displayName: "Optimize", aliases: ["optimize", "optimization"]},
    {displayName: "Scrum", aliases: ["scrum"]},
    {displayName: "Version control", aliases: ["version control"]},
    {displayName: "Web developer", aliases: ["web developer", "web dev"]},
    {displayName: "manage", aliases: ["manage", "managing", "management"]},
  ];

  const onChange = (value: string) => setValue(value);

  return (
    <main className={styles.main}>
      <div className={styles.contentWrap}>
        <section className={styles.HighlightAreaWrap}>
          <h2>Text to parse</h2>
          <div className={styles.textArea}>
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
          </div>
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
