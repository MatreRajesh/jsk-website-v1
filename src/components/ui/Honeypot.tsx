// Spam trap: hidden from people, but naive bots fill it in and the sheet script drops the entry.
export default function Honeypot() {
  return (
    <div className="hp-field" aria-hidden="true">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
