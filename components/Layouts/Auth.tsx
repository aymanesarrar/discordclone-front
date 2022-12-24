import { ReactNode } from "react";

const Auth = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      {children}
    </div>
  );
};
export { Auth as default };
