export default function KeyCard() {
  return (
    <div className="bg-[var(--color-card)] border rounded-lg p-6 w-80 shadow-lg">
      <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded mb-4 flex items-center justify-center">
        <span className="text-[var(--color-muted)]">
          3D Keyboard Preview
        </span>
      </div>
      <h2 className="text-2xl font-semibold mb-2">Model Name</h2>
      <p className="text-[var(--color-muted)] mb-4">
        A brief description of the keyboard model.
      </p>
      <button className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-2 rounded hover:bg-[var(--color-accent)] transition">
        Inspect Key
      </button>
    </div>
  )
}