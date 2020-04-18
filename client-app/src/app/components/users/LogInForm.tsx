import React from "react";
import { Formik } from "formik";
import TextInput from "../form/TextInput";
import { Form, Button } from "semantic-ui-react";
import useLogInForm from "../../hooks/useLogInForm";

const LogIn = () => {
  const { formValues, validationSchema, handleFormSubmit } = useLogInForm();

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize
    >
      {({ handleSubmit, handleChange, isValid, dirty, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <TextInput name="email" type="text" placeholder="Email" value={""} onChange={handleChange} />
          <TextInput name="password" type="password" placeholder="Password" value={""} onChange={handleChange} />
          <Button
            floated="right"
            color="orange"
            type="submit"
            content="Log In"
            loading={isSubmitting}
            disabled={!isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
};

export default LogIn;
