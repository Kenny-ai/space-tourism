export function Arrow({
  direction = "right",
}: {
  direction?: "right" | "left" | "diagonal";
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{
        transform:
          direction === "left"
            ? "rotate(180deg)"
            : direction === "diagonal"
              ? "rotate(-45deg)"
              : undefined,
      }}
    >
      <path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
export function Star() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 1c0 7-4 11-11 11 7 0 11 4 11 11 0-7 4-11 11-11C16 12 12 8 12 1Z"
        stroke="currentColor"
      />
    </svg>
  );
}
