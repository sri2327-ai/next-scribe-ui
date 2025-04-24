
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor Portal - S10.AI",
  description: "Healthcare management for doctors",
};

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
