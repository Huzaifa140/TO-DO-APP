export default function ConfigWarning() {
  return (
    <div className="config-warning" role="alert">
      Supabase keys missing. Copy <code>.env.example</code> to <code>.env</code>, add your
      project URL and anon key, then restart <code>npm run dev</code>.
    </div>
  );
}
