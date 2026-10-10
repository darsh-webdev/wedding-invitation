import { createFileRoute } from '@tanstack/react-router';
import { Invitation } from '@/components/wedding/Invitation';
import { invitationHead } from '@/components/wedding/shared';
export const Route = createFileRoute('/groom')({
  head: () => invitationHead('groom'),
  component: Groom,
});
function Groom() {
  return <Invitation side="groom" />;
}
