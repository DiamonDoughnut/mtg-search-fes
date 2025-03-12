

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div lang="en">
            <div>
                {children}
            </div>
        </div>
    )
  }