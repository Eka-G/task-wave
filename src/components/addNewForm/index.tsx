import { Form, Formik } from "formik";

import { FieldGroup } from "@components";
import { AddNewFormValue } from "@shared/types";

import styles from "./style.module.scss";

type AddNewFormProps = {
  buttonText: string;
  labelText: string;
  placeholderText: string;
  existingNames?: string[];
  maxFieldLength?: number;
  onSubmit: ({ name }: AddNewFormValue) => void;
};

export default function AddNewForm({
  buttonText,
  labelText,
  placeholderText,
  existingNames,
  maxFieldLength,
  onSubmit,
}: AddNewFormProps) {
  const validateForm = ({ name }: AddNewFormValue) => {
    const errors: { name?: string } = {};

    if (!name) {
      errors.name = "Обязательно для заполнения";
    }

    if (existingNames?.length && existingNames?.includes(name.toLowerCase())) {
      errors.name = "Уже существует";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ name: "" }}
      validate={validateForm}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <FieldGroup
            label={labelText}
            name="name"
            placeholder={placeholderText}
            maxFieldLength={maxFieldLength}
            errorsText={errors.name}
            isTouched={touched.name}
          />
          <button
            type="submit"
            className={styles.addForm__submitButton}
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            {buttonText}
          </button>
        </Form>
      )}
    </Formik>
  );
}
