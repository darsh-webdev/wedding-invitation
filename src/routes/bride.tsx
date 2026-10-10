import { createFileRoute } from '@tanstack/react-router';
import { Invitation } from '@/components/wedding/Invitation';
import { invitationHead } from '@/components/wedding/shared';
export const Route = createFileRoute('/bride')({
  head: () => invitationHead('bride'),
  component: Bride,
});
function Bride() {
  return <Invitation side="bride" />;
}
