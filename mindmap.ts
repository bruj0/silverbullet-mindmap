import { clientStore, editor } from "@silverbulletmd/silverbullet/syscalls";
import { updateMindMapPreview } from "./preview.ts";

export async function togglePreview() {
  const currentValue = !!(await clientStore.get("enableMindMapPreview"));
  await clientStore.set("enableMindMapPreview", !currentValue);
  if (!currentValue) {
    await updateMindMapPreview();
  } else {
    // Hide  preview
    await editor.hidePanel("rhs");
  }
}
