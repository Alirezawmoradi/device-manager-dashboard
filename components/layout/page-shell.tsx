import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

/** Outer page container: constrains width, sets consistent padding/spacing. */
export function PageShell({ children }: PageShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
