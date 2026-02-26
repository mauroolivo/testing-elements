export type Status = 'success' | 'warning' | 'error';

type StatusBadgeProps = {
  status: Status;
  label?: string;
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const text = label ?? status[0].toUpperCase() + status.slice(1);
  return (
    <span role="status" className={`status-badge status-${status}`}>
      {text}
    </span>
  );
}
