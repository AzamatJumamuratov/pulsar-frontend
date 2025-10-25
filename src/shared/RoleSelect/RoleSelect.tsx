import { Portal, Select, createListCollection } from "@chakra-ui/react";

const roles = createListCollection({
  items: [
    { label: "Администратор", value: "admin" },
    { label: "Врач", value: "doctor" },
    { label: "Регистратор", value: "reception" },
  ],
});

const RoleSelect = ({ setValue }: { setValue: any }) => {
  return (
    <Select.Root
      collection={roles}
      size="md"
      width="100%"
      multiple={false}
      onValueChange={(e) => setValue("role", e.value)} // теперь e.value — string
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
