"use client";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#fafafa",
          color: "#171717",
          fontFamily: "Arial, Helvetica, sans-serif",
          margin: 0,
          minHeight: "100vh",
        }}
      >
        <main
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "420px" }}>
            <p style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Application error
            </p>
            <h1 style={{ fontSize: "28px", margin: "12px 0" }}>
              Something went wrong
            </h1>
            <p style={{ lineHeight: 1.6, opacity: 0.7 }}>
              The application could not load. Try again, or contact support if the problem continues.
            </p>
            <button
              onClick={unstable_retry}
              style={{
                background: "#171717",
                border: 0,
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
                fontWeight: 600,
                padding: "10px 14px",
              }}
              type="button"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
