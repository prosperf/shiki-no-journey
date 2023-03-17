export const StoryContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-4xl bg-neutral-900/75 border-2 p-4 my-10 text-left  border-blue-900/75 ring ring-red-900/50">
      {children}
    </div>
  );
};
