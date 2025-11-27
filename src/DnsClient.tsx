import React, { useState } from "react";

const DnsClient: React.FC = () => {
  const [serverName, setServerName] = useState("");
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ server: serverName }),
      });

      if (!response.ok) {
        throw new Error("Server not found or DNS request failed");
      }

      // DNS server responds with redirect URL
      const url = response.url;
      setRedirectUrl(url);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setRedirectUrl(null);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>DNS Client</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter server name (e.g., server1)"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <button type="submit" style={{ marginLeft: "1rem", padding: "0.5rem" }}>
          Go
        </button>
      </form>

      {redirectUrl && (
        <div style={{ marginTop: "1rem" }}>
          Redirect URL: <a href={redirectUrl}>{redirectUrl}</a>
        </div>
      )}
      {error && <div style={{ marginTop: "1rem", color: "red" }}>{error}</div>}
    </div>
  );
};

export default DnsClient;
