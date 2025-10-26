"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";
import type { UseFormSetValue } from "react-hook-form";
import type { RegisterFormValues } from "@/pages/Auth/RegisterPage";
import type { UserRole } from "@/entities/profile/model/types";

const roles = createListCollection({
  items: [
    { label: "Врач", value: "doctor" },
    { label: "Регистратор", value: "reception" },
  ],
});

interface RoleSelectProps {
  setValue: UseFormSetValue<RegisterFormValues>;
}

const RoleSelect = ({ setValue }: RoleSelectProps) => {
  return (
    <Select.Root
      collection={roles}
      size="md"
      width="100%"
      multiple={false}
      onValueChange={(e) => setValue("role", e.value[0] as UserRole)} // ✅ теперь типобезопасно
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Выберите роль" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content>
            {roles.items.map((role) => (
              <Select.Item item={role} key={role.value}>
                {role.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default RoleSelect;
