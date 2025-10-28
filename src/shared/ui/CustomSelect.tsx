// src/components/shared/CustomSelect.tsx
"use client";

import { Select, createListCollection } from "@chakra-ui/react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  placeholder: string;
  defaultValue?: string[] | undefined;
  items: Option[];
  onChange?: (value: string) => void;
}

const CustomSelect = ({
  placeholder,
  items,
  defaultValue = undefined,
  onChange,
}: CustomSelectProps) => {
  const collection = createListCollection({ items });

  return (
    <Select.Root
      collection={collection}
      defaultValue={defaultValue}
      size="sm"
      width="100%"
      onValueChange={(e) => onChange?.(e.value[0] ?? "")}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {items.map((item) => (
            <Select.Item item={item} key={item.value}>
              {item.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};

export default CustomSelect;
