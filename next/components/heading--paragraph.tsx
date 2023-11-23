export function HeadingParagraph({ children }: { children: string }) {
  return (
    <h2 className="text-center text-heading-md font-bold text-steelgray md:text-heading-lg">
      {children}
    </h2>
  );
}
