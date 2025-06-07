import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meetzen - Agendar",
  description: "Agenda citas con Meetzen.",
};

export default function AppointmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full">{children}</div>;
}
