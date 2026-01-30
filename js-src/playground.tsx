import { render } from "preact";
import { useState } from "preact/hooks";
import { DynamicTnid } from "@tnid/core";
import { EncryptionKey, encryptV0ToV1, decryptV1ToV0 } from "@tnid/encryption";

// Shared utilities
const isValidName = (n: string): boolean => {
  if (n.length < 1 || n.length > 4) return false;
  return /^[a-z0-4]+$/.test(n);
};

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};

// Generator component (used on home page and tools page)
function Generator() {
  const [name, setName] = useState("user");
  const [variant, setVariant] = useState<"v0" | "v1">("v0");
  const [tnid, setTnid] = useState<string | null>(null);
  const [uuid, setUuid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"tnid" | "uuid" | null>(null);

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

  const copy = async (text: string, type: "tnid" | "uuid") => {
    await copyToClipboard(text);
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
              <button class="secondary" onClick={() => copy(tnid, "tnid")}>
                {copied === "tnid" ? "Copied!" : "Copy"}
              </button>
            </div>
          </label>
          <label>
            UUID
            <div class="grid">
              <input type="text" value={uuid} readOnly />
              <button class="secondary" onClick={() => copy(uuid, "uuid")}>
                {copied === "uuid" ? "Copied!" : "Copy"}
              </button>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

// Inspector component - parse and show details
function Inspector() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    tnid: string;
    uuid: string;
    name: string;
    variant: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inspect = () => {
    setError(null);
    setResult(null);

    if (!input.trim()) {
      setError("Enter a TNID or UUID");
      return;
    }

    try {
      const parsed = DynamicTnid.parse(input.trim());
      setResult({
        tnid: parsed,
        uuid: DynamicTnid.toUuidString(parsed),
        name: DynamicTnid.getName(parsed),
        variant: DynamicTnid.getVariant(parsed),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid TNID or UUID");
    }
  };

  return (
    <div>
      <label>
        TNID or UUID
        <input
          type="text"
          value={input}
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
          placeholder="user.Br2flcNDfF6LYICnT or d6157329-4640-8e30-..."
        />
      </label>

      <button onClick={inspect}>Inspect</button>

      {error && <p><mark>{error}</mark></p>}

      {result && (
        <table>
          <tbody>
            <tr><th>Name</th><td><code>{result.name}</code></td></tr>
            <tr><th>Variant</th><td>{result.variant === "v0" ? "V0 (time-ordered)" : "V1 (random)"}</td></tr>
            <tr><th>TNID</th><td><code>{result.tnid}</code></td></tr>
            <tr><th>UUID</th><td><code>{result.uuid}</code></td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

// Converter component - bidirectional TNID <-> UUID
function Converter() {
  const [tnidInput, setTnidInput] = useState("");
  const [uuidInput, setUuidInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const tnidToUuid = () => {
    setError(null);
    if (!tnidInput.trim()) {
      setError("Enter a TNID");
      return;
    }
    try {
      const parsed = DynamicTnid.parse(tnidInput.trim());
      setUuidInput(DynamicTnid.toUuidString(parsed));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid TNID");
    }
  };

  const uuidToTnid = () => {
    setError(null);
    if (!uuidInput.trim()) {
      setError("Enter a UUID");
      return;
    }
    try {
      const parsed = DynamicTnid.parse(uuidInput.trim());
      setTnidInput(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid UUID");
    }
  };

  return (
    <div>
      <div class="grid">
        <label>
          TNID
          <input
            type="text"
            value={tnidInput}
            onInput={(e) => setTnidInput((e.target as HTMLInputElement).value)}
            placeholder="user.Br2flcNDfF6LYICnT"
          />
          <button class="secondary" onClick={tnidToUuid}>Convert to UUID &rarr;</button>
        </label>
        <label>
          UUID
          <input
            type="text"
            value={uuidInput}
            onInput={(e) => setUuidInput((e.target as HTMLInputElement).value)}
            placeholder="d6157329-4640-8e30-..."
          />
          <button class="secondary" onClick={uuidToTnid}>&larr; Convert to TNID</button>
        </label>
      </div>

      {error && <p><mark>{error}</mark></p>}
    </div>
  );
}

// Encryption component - encrypt V0 to V1, decrypt V1 to V0
function Encryption() {
  const [key, setKey] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  const isValidKey = (k: string): boolean => {
    return /^[0-9a-fA-F]{32}$/.test(k);
  };

  const process = async () => {
    setError(null);
    setOutput(null);

    if (!isValidKey(key)) {
      setError("Key must be 32 hex characters (128 bits)");
      return;
    }

    if (!input.trim()) {
      setError("Enter a TNID");
      return;
    }

    try {
      const parsed = DynamicTnid.parse(input.trim());
      const variant = DynamicTnid.getVariant(parsed);
      const encKey = EncryptionKey.fromHex(key);

      if (mode === "encrypt") {
        if (variant === "v1") {
          setError("Already a V1 TNID. Did you mean to decrypt?");
          return;
        }
        if (variant !== "v0") {
          setError(`This is a ${variant.toUpperCase()} TNID. Only V0 can be encrypted.`);
          return;
        }
        setOutput(await encryptV0ToV1(parsed, encKey));
      } else {
        if (variant === "v0") {
          setError("Already a V0 TNID. Did you mean to encrypt?");
          return;
        }
        if (variant !== "v1") {
          setError(`This is a ${variant.toUpperCase()} TNID. Only V1 can be decrypted.`);
          return;
        }
        setOutput(await decryptV1ToV0(parsed, encKey));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  };

  const generateRandomKey = () => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    setKey(Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''));
  };

  return (
    <div>
      <label>
        Key (128-bit hex)
        <div class="grid">
          <input
            type="text"
            value={key}
            onInput={(e) => setKey((e.target as HTMLInputElement).value)}
            placeholder="0102030405060708090a0b0c0d0e0f10"
            maxLength={32}
            aria-invalid={key.length > 0 && !isValidKey(key) ? "true" : undefined}
          />
          <button class="secondary" onClick={generateRandomKey}>Random</button>
        </div>
      </label>

      <div class="grid">
        <label>
          Mode
          <select value={mode} onChange={(e) => setMode((e.target as HTMLSelectElement).value as "encrypt" | "decrypt")}>
            <option value="encrypt">Encrypt (V0 → V1)</option>
            <option value="decrypt">Decrypt (V1 → V0)</option>
          </select>
        </label>
        <label>
          Input TNID
          <input
            type="text"
            value={input}
            onInput={(e) => setInput((e.target as HTMLInputElement).value)}
            placeholder={mode === "encrypt" ? "V0 TNID" : "V1 TNID"}
          />
        </label>
      </div>

      <button onClick={process}>{mode === "encrypt" ? "Encrypt" : "Decrypt"}</button>

      {error && <p><mark>{error}</mark></p>}

      {output && (
        <label>
          Output
          <input type="text" value={output} readOnly />
        </label>
      )}
    </div>
  );
}

// Mount components based on what elements exist on the page
const playgroundMount = document.getElementById("playground-mount");
if (playgroundMount) {
  render(<Generator />, playgroundMount);
}

const generatorMount = document.getElementById("tool-generator");
if (generatorMount) {
  render(<Generator />, generatorMount);
}

const inspectorMount = document.getElementById("tool-inspector");
if (inspectorMount) {
  render(<Inspector />, inspectorMount);
}

const converterMount = document.getElementById("tool-converter");
if (converterMount) {
  render(<Converter />, converterMount);
}

const encryptionMount = document.getElementById("tool-encryption");
if (encryptionMount) {
  render(<Encryption />, encryptionMount);
}
