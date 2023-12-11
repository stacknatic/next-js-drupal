export function HeadingParagraph({ children }: { children: string }) {
  return (
    <h2 className="lg:text-left lg:px-44 lg:mt-10 lg:text-lg text-md font-bold text-mischka text-center mt-10 mb-8">
      {children}
    </h2>
  );
}
