export function HeadingPage({ children }: { children: JSX.Element | string }) {
  return (
    <h1 className="text-heading-lg md:text-heading-xl text-primary-800 font-bold text-center md:text-left py-8 md:py-16">
      {children}
    </h1>
  );
}
