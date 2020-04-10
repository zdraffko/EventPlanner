import React from "react";
import { Form, Label, FormFieldProps } from "semantic-ui-react";
import { useField } from "formik";

interface IProps extends FormFieldProps {
  name: string;
  placeholder: string;
}

const TextArea: React.FC<IProps> = ({ name, placeholder, width, rows }) => {
  const [field, { touched, error }] = useField(name);

  return (
    <Form.Field error={touched && !!error} width={width}>
      <textarea {...field} placeholder={placeholder} rows={rows} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextArea;