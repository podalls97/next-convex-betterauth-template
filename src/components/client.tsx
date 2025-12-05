import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";

export function SignOutButton({
  onClick,
  loading,
}: {
  onClick: () => any;
  loading?: boolean;
}) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick} disabled={loading}>
      {loading ? (
        <Loader2 size={16} className="mr-2 animate-spin" />
      ) : (
        <LogOut size={16} className="mr-2" />
      )}
      Sign out
    </Button>
  );
}
