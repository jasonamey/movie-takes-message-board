import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const clickHandler = async () => {
    try {
      const user = await signIn("credentials", {
        email: process.env.NEXT_PUBLIC_TEST_EMAIL,
        password: process.env.NEXT_PUBLIC_TEST_PWD,
      });
      console.log("da user", user);
      await router.push("/");
    } catch {
      console.log("There was an error in signing in for test development");
    }
  };
  return (
    <div>
      <button onClick={() => void clickHandler()}>test login</button>
    </div>
  );
}

export const getServerSideProps = () => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "development") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
