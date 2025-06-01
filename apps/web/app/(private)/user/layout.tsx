import { NavbarUser } from "@/modules/user/navbar-user";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarUser />
      {children}
    </>
  );
}