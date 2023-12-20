export function HeadingPage({ children }: { children: JSX.Element | string }) {
  return (
    <h1 className="md:text center text-left text-heading-md font-bold text-primary-800 md:text-heading-xl md:py-16 py-8">
      {children}
    </h1>
  );
}
