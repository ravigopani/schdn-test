import { StateEditPage } from "@/components/admin/state/state-edit-page";
import { StateView } from "@/components/admin/state/state-view";

/**
 * @param {{ params: Promise<{ id: string }> }} props
 */
export default async function EditStatePage({ params }) {
  const { id } = await params;

  return <StateEditPage stateId={id} />;
  // return <StateView stateId={id} />;
}
