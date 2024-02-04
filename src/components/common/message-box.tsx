import { Snippet } from "@nextui-org/react";

interface MessageBoxProps {
  message: string;
  color:
    | "default"
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | undefined;
}

export default function MessageBox({ message, color }: MessageBoxProps) {
  return (
    <Snippet
      className="bg-opacity-75"
      hideCopyButton
      hideSymbol
      color={color}
      variant="solid"
    >
      <div className="text-wrap">{message}</div>
    </Snippet>
  );
}
