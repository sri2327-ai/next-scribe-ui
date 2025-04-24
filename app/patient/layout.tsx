
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Portal - S10.AI",
  description: "Healthcare portal for patients",
};

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
