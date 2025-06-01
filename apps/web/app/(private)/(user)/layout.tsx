import { NavbarUser } from "@/modules/user/navbar-user";

export default function UserLayout({
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