import { useCallback, useContext } from "react";
import { FormikHelpers } from "formik";
import * as YupValidator from "yup";
import { IUserRegisterFormValues } from "../models/userModels";
import { RootStoreContext } from "../stores/rootStore";

const useRegisterForm = () => {
  const { UserStore } = useContext(RootStoreContext);

  const { register } = UserStore;

  const formValues: IUserRegisterFormValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = YupValidator.object({
    username: YupValidator.string()
      .required("Please enter a username.")
      .max(20, "Username must not exceed 20 characters."),
    email: YupValidator.string().required("Please enter your email.").email("Please provide a valid email."),
    password: YupValidator.string()
      .required("Please enter your password.")
      .min(6, "Password must be at least 6 characters.")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter.")
      .matches(/[a-z]/, "Password must contain at least 1 lowercase letter.")
      .matches(/[0-9]/, "Password must contain a number.")
      .matches(/[^A-Za-z0-9]/, "Password must contain at least 1 non alphanumeric character."),
  });

  const handleFormSubmit = useCallback(
    (registerInfo: IUserRegisterFormValues, helpers: FormikHelpers<IUserRegisterFormValues>) => {
      register(registerInfo)
        .catch((error) => {
          helpers.setFieldError("username", error.data.error);
        })
        .finally(() => helpers.setSubmitting(false));
    },
    [register]
  );

  return { formValues, validationSchema, handleFormSubmit };
};

export default useRegisterForm;
