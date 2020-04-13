import React from "react";
import { Form, Label, FormFieldProps, Select } from "semantic-ui-react";
import { useField } from "formik";

interface IProps extends FormFieldProps {
  name: string;
  placeholder: string;
  options: Array<{ value: string; text: string }>;
}

const SelectInput: React.FC<IProps> = ({
  name,
  placeholder,
  width,
  options,
}) => {
  const [field, { touched, error }, { setValue }] = useField(name);

  return (
    <Form.Field error={touched && !!error} width={width}>
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
      <Select
        value={field.value}
        placeholder={placeholder}
        options={options}
        onChange={(event, data) => setValue(data.value)}
      />
    </Form.Field>
  );
};

export default SelectInput;
