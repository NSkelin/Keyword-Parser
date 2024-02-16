import React from "react";
import styles from "./ResumeSection.module.scss";

export interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}
function ResumeSection({title, children}: ResumeSectionProps) {
  return (
    <section>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  );
}

export default ResumeSection;
