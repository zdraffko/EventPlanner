import { useCallback } from "react";

interface IEventFormFields {
  title: string;
  description: string;
  category: string;
  date: string;
  city: string;
  venue: string;
}

const useEventForm = () => {
  const initialFormValues: IEventFormFields = {
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  };

  const handleFormSubmit = useCallback((formValues: IEventFormFields) => {
    console.log(formValues);
  }, []);

  return { initialFormValues, handleFormSubmit };
};

export default useEventForm;
