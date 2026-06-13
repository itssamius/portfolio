import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "ghost";

export function Button({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-fg hover:opacity-90"
      : "border border-border text-fg hover:border-accent hover:text-accent";
  return (
    <Link href={href} className={clsx(base, styles, className)} {...rest}>
      {children}
    </Link>
  );
}
