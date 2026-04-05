import { Loader2 } from "lucide-react";

const Preloader = () => {
  return (
    <div className="h-screen w-full z-10000 bg-background flex justify-center items-center fixed top-0 left-0">
      <Loader2 className="size-16 animate-spin" />
    </div>
  );
};

export default Preloader;
