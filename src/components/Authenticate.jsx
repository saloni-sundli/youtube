import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addUser } from "../utils/slices";
import { auth } from "../utils/firebase";
import tw from "tailwind-styled-components";

const Authenticate = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    // ! Validate Form Details

    if (email.current.value.length <= 0 || password.current.value.length <= 0)
      return;

    if (!isSignInForm) {
      // * START: Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // * Signed In
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Ffree-png-zdjuf&psig=AOvVaw1d8R2lO9o6tUKXO396xVqu&ust=1698858371611000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIiTqODioIIDFQAAAAAdAAAAABAE",
          })
            .then(() => {
              // * Profile Updated
              const { uid, email, displayName, photoURL } = auth.currentUser;

              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName || name.current.value,
                  photoURL: photoURL,
                })
              );
              setIsSignInForm(true);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });

      // * END: Sign Up Logic
    } else {
      // * START: Sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // * Signed in
          const user = userCredential.user;
          navigate("/");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ": " + errorMessage);
        });

      // * END: Sign In Logic
    }
  };

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Title>{isSignInForm ? "Sign In" : "Sign Up"}</Title>
        {!isSignInForm && (
          <Input ref={name} type="text" placeholder="Full Name" />
        )}
        <Input ref={email} type="text" placeholder="Email Address" />
        <Input ref={password} type="password" placeholder="Password" />
        <Button onClick={handleSubmit}>Submit</Button>
        <div>
          click to redirect to{" "}
          <Toggle onClick={() => setIsSignInForm(!isSignInForm)}>
            {isSignInForm ? "Sign Up Now" : "Sign In Now"}
          </Toggle>
        </div>
      </Form>
    </>
  );
};

export default Authenticate;
const Form = tw.form`flex flex-col p-4 gap-4 items-center border-2 rounded-md mx-auto my-auto`;
const Button = tw.button`bg-red-600 p-2 w-full rounded-md`;
const Input = tw.input`w-full text-black p-2 rounded-md`;
const Toggle = tw.button`bg-black p-2 ml-4 rounded-md`;
const Title = tw.h1`font-bold text-2xl tracking-wider`;
