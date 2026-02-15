type ToastProps = {
  title: string;
  description?: string;
};

export function toast({ title, description }: ToastProps) {
  alert(`${title}\n${description ?? ""}`);
}