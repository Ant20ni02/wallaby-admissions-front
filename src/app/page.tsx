import LoginButton from "./components/LoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Home() {
  return (
    <GoogleOAuthProvider clientId="722295534456-g5lg8gbkmok7g4lmb5lp0rrdrbshgjfh.apps.googleusercontent.com">
      <main>
        <LoginButton />
      </main>
    </GoogleOAuthProvider>
  );
}
