export const metadata = {
  title: "Search users",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
