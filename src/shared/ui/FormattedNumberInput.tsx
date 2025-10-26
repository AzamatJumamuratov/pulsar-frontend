import { Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface FormattedNumberInputProps {
  value?: string | number | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  [key: string]: any;
}

export function FormattedNumberInput({
  value,
  onChange,
  placeholder,
  ...rest
}: FormattedNumberInputProps) {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value === null || value === "" || value === undefined) {
      setDisplayValue("");
      return;
    }
    const numeric = Number(value);
    if (!isNaN(numeric)) {
      setDisplayValue(numeric.toLocaleString("ru-RU"));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\s/g, "").replace(/[^0-9]/g, "");
    setDisplayValue(raw ? Number(raw).toLocaleString("ru-RU") : "");
    onChange?.(raw);
  };

  return (
    <Input
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      inputMode="numeric"
      {...rest}
    />
  );
}
