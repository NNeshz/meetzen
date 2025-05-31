import { Navbar } from "@/modules/global/navbar";
import { Footer } from "@/modules/global/footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}