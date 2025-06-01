import { CitasCards } from "@/modules/user/citas/citas-cards";

export default function UserPage() {
  return (
    <div className="pt-24 px-4">
      <div className="@container/main max-w-4xl mx-auto flex flex-col gap-4">
        <CitasCards />
        <CitasCards />
      </div>
    </div>
  );
}
