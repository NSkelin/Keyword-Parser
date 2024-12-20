import styles from "./ResumeSection.module.scss";

export interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}
export function ResumeSection({title, children}: ResumeSectionProps) {
  return (
    <section>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  );
}
