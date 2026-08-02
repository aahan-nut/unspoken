import { Alert } from "@/components/ui/Alert";

interface DisclaimerProps {
  className?: string;
}

export function Disclaimer({ className }: DisclaimerProps) {
  return (
    <Alert variant="info" title="Important to know" className={className}>
      Unspoken is a self-reflection and resource-navigation tool. It is{" "}
      <strong>not</strong> therapy, medical care, crisis counseling, or a
      diagnostic service. If you are in crisis or need immediate help, please
      contact a crisis line or emergency services.
    </Alert>
  );
}
