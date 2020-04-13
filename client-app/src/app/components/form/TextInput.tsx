import React from "react";
import { Form, Label, FormFieldProps } from "semantic-ui-react";
import { useField } from "formik";

interface IProps extends FormFieldProps {
  name: string;
  type: string;
  placeholder: string;
}

const TextInput: React.FC<IProps> = ({ name, type, placeholder, width }) => {
  const [field, { touched, error }] = useField(name);

  return (
    <Form.Field error={touched && !!error} width={width}>
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
      <input {...field} type={type} placeholder={placeholder} />
    </Form.Field>
  );
};

export default TextInput;
