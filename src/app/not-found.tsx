import Link from "next/link";
export default function NotFound() {
  return (
    <div className="not-found page-container">
      <p className="eyebrow">404 — OFF THE FLIGHT PATH</p>
      <h1>
        A little too
        <br />
        far out.
      </h1>
      <p className="body-copy">
        Let’s get you back to somewhere extraordinary.
      </p>
      <Link href="/" className="text-link">
        RETURN TO EARTH ↗
      </Link>
    </div>
  );
}
