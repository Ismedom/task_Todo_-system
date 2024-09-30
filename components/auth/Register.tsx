"use client";

import React, { useState } from "react";
import SignIn from "./Signin";
import SignUp from "./Signup";

const Register = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    return <div>{isSignIn ? <SignIn setIsSignIn={setIsSignIn} /> : <SignUp setIsSignIn={setIsSignIn} />}</div>;
};

export default Register;
