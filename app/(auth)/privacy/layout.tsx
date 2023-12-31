export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
