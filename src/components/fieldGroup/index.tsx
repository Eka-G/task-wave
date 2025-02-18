import { Field } from "formik";
import styles from "./style.module.scss";

type FieldGroupPtops = {
  label: string;
  name: string;
  placeholder: string;
  maxFieldLength?: number;
  errorsText?: string;
  isTouched?: boolean;
};

export default function FieldGroup({
  label,
  name,
  placeholder,
  maxFieldLength,
  errorsText,
  isTouched,
}: FieldGroupPtops) {
  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={`${name}-id`} className={styles.fieldGroup__label}>
        {label}
      </label>
      <Field
        id={`${name}-id`}
        className={styles.fieldGroup__input}
        type="text"
        name={name}
        minLength={3}
        maxLength={maxFieldLength || 50}
        placeholder={placeholder}
        required
      />
      {errorsText && isTouched && (
        <span className={styles.fieldGroup__errors}>{errorsText}</span>
      )}
    </div>
  );
}
