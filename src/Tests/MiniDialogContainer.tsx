// src/widgets/MiniDialog/MiniDialogContainer.tsx
import { MiniDialogView } from "./MiniDialogView";
import { useMiniDialog } from "./useMiniDialog";

export default function MiniDialogContainer() {
  const { isOpen, open, close, form, onSubmit, currentStep } = useMiniDialog();

  return (
    <MiniDialogView
      isOpen={isOpen}
      onOpenChange={(v) => (v ? open() : close())}
      form={form}
      onSubmit={onSubmit}
      currentStep={currentStep}
    />
  );
}
