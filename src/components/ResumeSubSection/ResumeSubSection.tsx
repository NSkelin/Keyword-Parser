import styles from "./ResumeSubSection.module.scss";

export interface ResumeSubSectionProps {
  title: string;
  subTitle: string;
  startDate: Date;
  endDate?: Date | null;
  children: React.ReactNode;
}
export function ResumeSubSection({title, subTitle, startDate, endDate, children}: ResumeSubSectionProps) {
  return (
    <section className={styles.history}>
      <div className={styles.position}>
        <h3>{title}</h3>
        {`${startDate.getFullYear()} - ${endDate?.getFullYear() ?? "present"}`}
      </div>
      <i>{subTitle}</i>

      {children}
    </section>
  );
}
