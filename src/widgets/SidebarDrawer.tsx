import { Drawer } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { setSidebarOpen } from "@/app/uiSlice";
import ProfileInfo from "@/widgets/ProfileInfo";

const SidebarDrawer = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);

  return (
    <Drawer.Root
      open={isSidebarOpen}
      onOpenChange={(details) => dispatch(setSidebarOpen(details.open))}
      placement="start"
      size={{ base: "xs", md: "md" }}
    >
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Профиль</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <ProfileInfo />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

export default SidebarDrawer;
