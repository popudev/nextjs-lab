import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, useCallback } from "react";
import { TextField, TextFieldProps } from "@mui/material";
const INPUT_DELAY = 300;

export const TextFieldCustom = (props: TextFieldProps) => {
  const [innerValue, setInnerValue] = useState("");

  useEffect(() => {
    if (props.value) {
      const value = props.value as string;
      setInnerValue(value.trim());
    } else {
      setInnerValue("");
    }
  }, [props.value]);

  const debouncedHandleOnChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(event);
    }
  }, INPUT_DELAY);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();

    const newValue = event.currentTarget.value;
    setInnerValue(newValue);
    debouncedHandleOnChange(event);
  }, []);

  return <TextField {...props} value={innerValue} onChange={handleOnChange} />;
};
