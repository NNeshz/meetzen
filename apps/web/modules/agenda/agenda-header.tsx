export function AgendaHeader({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: { name: string; description: string };
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Agenda
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Aquí puedes gestionar tus citas y eventos.
      </p>
    </div>
  );
}
