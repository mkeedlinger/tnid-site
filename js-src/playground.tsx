import { render } from "preact";
import { useState } from "preact/hooks";
import { DynamicTnid } from "@tnid/core";

function Playground() {
  const [name, setName] = useState("user");
  const [variant, setVariant] = useState<"v0" | "v1">("v0");
  const [tnid, setTnid] = useState<string | null>(null);
  const [uuid, setUuid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"tnid" | "uuid" | null>(null);

  const isValidName = (n: string): boolean => {
    if (n.length < 1 || n.length > 4) return false;
    return /^[a-z0-4]+$/.test(n);
  };

  const generate = () => {
    setError(null);
    setCopied(null);

    if (!isValidName(name)) {
      setError("Name must be 1-4 characters, only a-z and 0-4");
      setTnid(null);
      setUuid(null);
      return;
    }

    try {
      const id = variant === "v0"
        ? DynamicTnid.newV0(name)
        : DynamicTnid.newV1(name);
      setTnid(id);
      setUuid(DynamicTnid.toUuidString(id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate");
      setTnid(null);
      setUuid(null);
    }
  };

  const copyToClipboard = async (text: string, type: "tnid" | "uuid") => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div class="grid">
        <label>
          Name
          <input
            type="text"
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value.toLowerCase())}
            placeholder="user"
            maxLength={4}
            aria-invalid={name.length > 0 && !isValidName(name) ? "true" : undefined}
          />
          <small>1-4 characters, a-z and 0-4 only</small>
        </label>
        <label>
          Variant
          <select value={variant} onChange={(e) => setVariant((e.target as HTMLSelectElement).value as "v0" | "v1")}>
            <option value="v0">V0 (time-ordered)</option>
            <option value="v1">V1 (random)</option>
          </select>
        </label>
      </div>

      <button onClick={generate}>Generate</button>

      {error && <p><mark>{error}</mark></p>}

      {tnid && uuid && (
        <div>
          <label>
            TNID
            <div class="grid">
              <input type="text" value={tnid} readOnly />
              <button class="secondary" onClick={() => copyToClipboard(tnid, "tnid")}>
                {copied === "tnid" ? "Copied!" : "Copy"}
              </button>
            </div>
          </label>
          <label>
            UUID
            <div class="grid">
              <input type="text" value={uuid} readOnly />
              <button class="secondary" onClick={() => copyToClipboard(uuid, "uuid")}>
                {copied === "uuid" ? "Copied!" : "Copy"}
              </button>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

const mount = document.getElementById("playground-mount");
if (mount) {
  render(<Playground />, mount);
}
