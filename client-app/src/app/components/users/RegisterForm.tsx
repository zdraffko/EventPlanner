import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Formik } from "formik";
import TextInput from "../form/TextInput";
import { Form, Button, Header } from "semantic-ui-react";
import useRegisterForm from "../../hooks/useRegisterForm";
import { RootStoreContext } from "../../stores/rootStore";
import LogInForm from "./LogInForm";

const RegisterForm = () => {
  const { formValues, validationSchema, handleFormSubmit } = useRegisterForm();
  const { CommonStore, UserStore } = useContext(RootStoreContext);

  const { openModal } = CommonStore;
  const { hasRegistered } = UserStore;

  return (
    <>
      {hasRegistered ? (
        openModal(
          <>
            <Header as="h2" content="Successful Registration!" color="orange" textAlign="center" />
            <Header as="h4" textAlign="center" style={{ marginBottom: "30px" }}>
              You can now log in in your account.
            </Header>
            <Button floated="right" color="orange" fluid content="Log in" onClick={() => openModal(<LogInForm />)} />
          </>
        )
      ) : (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {({ handleSubmit, handleChange, isValid, dirty, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Header as="h2" content="Register" color="orange" textAlign="center" />
              <TextInput
                name="username"
                type="text"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
              <TextInput
                name="email"
                type="text"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
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
                content="Register"
                loading={isSubmitting}
                disabled={!isValid || !dirty}
              />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default observer(RegisterForm);
