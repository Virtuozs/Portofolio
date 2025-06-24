import type { ReactNode } from "react";
import { mergeClass } from "../../libs/utils";

export function TypographyH1({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={mergeClass(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}
export function TypographyH2({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={mergeClass(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}
export function TypographyH3({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={mergeClass(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}
export function TypographyH4({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={mergeClass(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}
export function TypographyP({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={mergeClass("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}
export function TypographyBlockquote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <blockquote className={mergeClass("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
}
export function TypographyTable({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={mergeClass("my-6 w-full overflow-y-auto", className)}>
      <table className={mergeClass("w-full")}>
        <thead>
          <tr className={mergeClass("m-0 border-t p-0 even:bg-muted")}>
            <th
              className={mergeClass(
                "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
              )}
            >
              King&apos;s Treasury
            </th>
            <th
              className={mergeClass(
                "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
              )}
            >
              People&apos;s happiness
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={mergeClass("m-0 border-t p-0 even:bg-muted")}>
            <td
              className={mergeClass(
                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
              )}
            >
              Empty
            </td>
            <td
              className={mergeClass(
                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
              )}
            >
              Overflowing
            </td>
          </tr>
          <tr className={mergeClass("m-0 border-t p-0 even:bg-muted")}>
            <td
              className={mergeClass(
                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
              )}
            >
              Modest
            </td>
            <td
              className={mergeClass(
                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
              )}
            >
              Satisfied
            </td>
          </tr>
          <tr className={mergeClass("m-0 border-t p-0 even:bg-muted")}>
            <td
              className={mergeClass(
                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
              )}
            >
              Full
            </td>
            <td
              className={mergeClass(
                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
              )}
            >
              Ecstatic
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export function TypographyList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ul className={mergeClass("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {children}
    </ul>
  );
}
export function TypographyInlineCode({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <code
      className={mergeClass(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
    >
      {children}
    </code>
  );
}
export function TypographyLead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={mergeClass("text-xl text-muted-foreground", className)}>{children}</p>
  );
}
export function TypographyLarge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={mergeClass("text-lg font-semibold", className)}>{children}</div>
  );
}

export function TypographySmall({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <small className={mergeClass("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
}
export function TypographyMuted({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={mergeClass("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
