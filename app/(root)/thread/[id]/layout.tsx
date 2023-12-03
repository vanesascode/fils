export const metadata = {
  title: "Fils posts",
};

export default function FilsPostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
