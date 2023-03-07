import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../utils/firebase";

export const CommandPrompt = ({
  killFunction,
}: {
  killFunction: () => void;
}) => {
  const [inputText, setInputText] = useState("");

  const executeCommand = (command: string) => {};

  const onFormSubmit = (e: any) => {
    switch (inputText) {
      case "login":
        console.log("Logging In");
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential ? credential.accessToken : "";
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });

        break;
      default:
        console.log("ERROR: Unkown Command");
    }

    killFunction();
    e.preventDefault();
  };

  //listen for ctrl + alt + t
  // useEffect(() => {
  //   const onKeyDown = (e: KeyboardEvent) => {
  //     // on purpose (only one key in condition)
  //     if (e.code === "Enter") {
  //       executeCommand(inputText);
  //     }
  //   };
  //   document.addEventListener("keydown", onKeyDown);
  //   return () => {
  //     // document.removeEventListener("keydown", onKeyDown);
  //     document.removeEventListener("keydown", onKeyDown);
  //   };
  // }, []);

  return (
    <form
      className="absolute bg-black h-8 max-w-4xl overflow-hidden"
      onSubmit={onFormSubmit}
    >
      <input
        className="bg-black"
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit" hidden />
    </form>
  );
};
