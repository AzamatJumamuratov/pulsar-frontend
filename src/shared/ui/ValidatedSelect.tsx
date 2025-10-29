import { Controller, useFormContext } from "react-hook-form";
import CustomSelect, { type Option } from "./CustomSelect";
import { Box } from "@chakra-ui/react";

interface ValidatedSelectProps {
  name: string;
  placeholder: string;
  required?: string;
  options: Option[];
}

const ValidatedSelect = ({
  name,
  options,
  placeholder,
  required,
}: ValidatedSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? required : "Это поле обязательно",
      }}
      render={({ field }) => (
        <>
          <CustomSelect
            placeholder={placeholder}
            items={options}
            value={field.value}
            onChange={field.onChange}
          />

          {errors[name] && (
            <Box style={{ color: "red", fontSize: 14 }}>
              {errors[name]?.message as string}
            </Box>
          )}
        </>
      )}
    />
  );
};

export default ValidatedSelect;
