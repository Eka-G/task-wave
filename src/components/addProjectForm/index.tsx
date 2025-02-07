import { useId } from "react";
import { Form, Formik } from "formik";

import { useAppDispatch } from "@app/hooks";
import { FieldGroup } from "@components";
import { projectAdded } from "@features/projects/projects-slice";

import styles from "./style.module.scss";

type FormValue = {
  projectName: string;
};

export default function AddProjectForm({ onSubmit }: { onSubmit: () => void }) {
  const projectId = useId();
  const dispatch = useAppDispatch();

  const addProject = ({ projectName }: FormValue) => {
    dispatch(
      projectAdded({
        id: projectId,
        name: projectName,
      })
    );
    onSubmit();
  };

  const validateForm = ({ projectName }: FormValue) => {
    const errors: { projectName?: string } = {};

    if (!projectName) {
      errors.projectName = "Введите название проекта";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ projectName: "" }}
      validate={validateForm}
      onSubmit={(values, { setSubmitting }) => {
        addProject(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <FieldGroup
            label="Название:"
            name="projectName"
            placeholder="Введите название"
            errorsText={errors.projectName}
            isTouched={touched.projectName}
          />
          <button
            type="submit"
            className={styles.addForm__submitButton}
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            Добавить
          </button>
        </Form>
      )}
    </Formik>
  );
}
