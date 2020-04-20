import React from "react";
import { observer } from "mobx-react-lite";
import { Formik } from "formik";
import TextInput from "../form/TextInput";
import { Form, Button, Header } from "semantic-ui-react";
import useLogInForm from "../../hooks/useLogInForm";

const LogInForm = () => {
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
          <Header as="h2" content="Log In" color="orange" textAlign="center" />
          <TextInput name="email" type="text" placeholder="Email" value={formValues.email} onChange={handleChange} />
          <TextInput
            name="password"
            type="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
          />
          <Button
            floated="right"
            color="orange"
            fluid
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

export default observer(LogInForm);
