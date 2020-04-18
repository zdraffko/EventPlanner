import { useCallback, useContext } from "react";
import { FormikHelpers } from "formik";
import * as YupValidator from "yup";
import { IUserLogInFormValues } from "../models/userModels";
import { RootStoreContext } from "../stores/rootStore";

const useLogInForm = () => {
  const { UserStore } = useContext(RootStoreContext);

  const { logIn } = UserStore;

  const formValues: IUserLogInFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = YupValidator.object({
    email: YupValidator.string().required("Please enter your email.").email("Please provide a valid email."),
    password: YupValidator.string().required("Please enter your password."),
  });

  const handleFormSubmit = useCallback(
    (loginInfo: IUserLogInFormValues, helpers: FormikHelpers<IUserLogInFormValues>) => {
      logIn(loginInfo)
        .catch((error) => {
          helpers.setFieldError("email", error.data.error);
        })
        .finally(() => helpers.setSubmitting(false));
    },
    [logIn]
  );

  return { formValues, validationSchema, handleFormSubmit };
};

export default useLogInForm;
