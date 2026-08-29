export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          StayMate
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          AD
        </div>

        <div className="hidden sm:block">
          <p className="text-sm font-medium text-slate-900">
            ADMIN
          </p>

          <p className="text-xs text-slate-500">
            User
          </p>
        </div>
      </div>
    </header>
  );
}