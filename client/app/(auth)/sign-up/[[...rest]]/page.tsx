import { SignIn, SignUp } from "@clerk/nextjs";
import "@/styles/custom_clerk_styles.css";

const SignInPage = () => {
  return (
    <main className="flex justify-center items-center min-h-screen w-full">
      <SignUp />
    </main>
  );
};

export default SignInPage;
