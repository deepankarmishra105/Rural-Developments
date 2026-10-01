import React, { useState } from 'react'
import styled from 'styled-components'

function Login() {
  const[login,setlogin]=useState(true)
  return (
    <Main>
       
      <Div>
         <div className='btn'>
           <button onClick={()=>setlogin(true)}>login</button>
          <button onClick={()=>setlogin(false)}>sign UP</button>
         </div>
          <Saction>
            { login ?<>
  
    <Section>
  {/* Username */}
  <Field>
    <Input
      type="text"
      id="username"
      placeholder=" "
    />
    <Label htmlFor="username">Username</Label>
  </Field>

  {/* Password */}
  <Field>
    <Input
      type="password"
      id="password"
      placeholder=" "
    />
    <Label htmlFor="password">Password</Label>
  </Field>

  {/* Forgot Password */}
  <ForgotPassword href="#">
    Forgot Password?
  </ForgotPassword>

  
  <LoginButton type="button">
    Login
  </LoginButton>

  {/* Sign Up */}
  <SignupText>
    Don't have an account?{" "}
    <SignupLink href="#" onClick={()=>setlogin(false)}>
      Sign Up
    </SignupLink>
  </SignupText>
</Section>
<br /><br /><br />
<Deg>Let Nature <br /> &nbsp;  &nbsp;  &nbsp;&nbsp; Flow Your Way </Deg>

<Line></Line>

</>

:
  <Section>
   <Field>
      <Input
      type="text"
      id="username"
      placeholder=" "
    />
    <Label htmlFor="username">Full Name</Label>
  </Field>


   <Field>
    <Input
      type="email"
      id="username"
      placeholder=" "
    />
    <Label htmlFor="username">Email</Label>
  </Field>
  
  {/* Password */}
  <Field>
    <Input
      type="password"
      id="password"
      placeholder=" "
    />
    <Label htmlFor="password">Password</Label>
  </Field>

  
  {/* Password */}
  <Field>
    <Input
      type="password"
      id="password"
      placeholder=" "
    />
    <Label htmlFor="password">Conform Password</Label>
  </Field>
   
  <LoginButton type="button">
    Submit
  </LoginButton>

   {/* Sign Up */}
  <SignupText>
    Already have an account?{" "}
    <SignupLink href="#" onClick={()=>setlogin(true)}>
      Sign In
    </SignupLink>
  </SignupText>
  </Section>  }
          </Saction>
      </Div>

   
   
    </Main>
  )
}

export default Login
const Line=styled.div`
  width: 70%;
  height: 2px;
  margin: 8px auto 15px;
  background: #12221aaa;
  border-radius: 60%;
`
const P=styled.p`
font-size:14px;
letter-spacing: 1px;
color:#12221aaa;
font-weight:600;
`

const Deg=styled.h2`
  margin-top:35px;
  text-align: center;
  font-family: "Brush Script MT",;
  font-size: 42px;
  font-style: italic;
  font-weight: 600;
  color: #12221aaa;
  text-shadow: 1px 2px 4px rgba(0,0,0,0.15);

`



const Saction=styled.section`
  display: flex;
  flex-direction: column;
 

`
const Main=styled.div`
min-height: 100vh;
max-width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: url(public/3d-render-tree-grassy-landscape.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
    @media (max-width:768px) {
    justify-content: center;
    padding: 15px;
    
  }

`
const Div=styled.div`
  height: 700px;
  width:600px;
  @media (max-width:768px) {
    width: 90%;
    height: auto;
    
  }
  border: 2px solid rgba;
  border-radius: 20px;
  background:#ffffff3b;
  box-shadow: 0 5px 25px rgba(0,0,0,0.5);

  
  
 .btn{
  display: flex;
  gap: 30px;
  justify-content: center;
  margin-top:10px;
 }
  
  
  button{
       height: 40px;
        padding: 12px 30px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        background: linear-gradient(45deg,#5ce7a6,#007cce);
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
        &:hover{
           transform: translateY(-4px);
           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.729);
           transform: scale(0.95);
           
        }
    
  }
`
const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  margin-top: 35px;
`;

const Field = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 28px;
`;

const Input = styled.input`
  width: 100%;
  height: 55px;
  padding: 0 16px;

  box-sizing: border-box;

  border: 2px solid #ddd;
  border-radius: 12px;

  outline: none;
  background: #80c5ac24;

  font-size: 16px;
  color:black;

  transition: all 0.35s ease;

  &::placeholder {
    color: transparent;
  }

  &:hover {
    border-color: #8b85ff;
  }

  &:focus {
    border-color: #6c63ff;

    box-shadow:
      0 0 8px rgba(108, 99, 255, 0.35),
      0 0 20px rgba(0, 200, 255, 0.15);

    transform: translateY(-2px);
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 0;
    left: 14px;

    transform: translateY(-50%);

    font-size: 12px;
    font-weight: 600;

    color: #6c63ff;

    background: #eae7e78f;
    padding: 0 6px;
  }
`;

const Label = styled.label`
  position: absolute;

  left: 16px;
  top: 50%;

  transform: translateY(-50%);

  color: #777;
  font-size: 16px;

  pointer-events: none;

  transition: all 0.3s ease;
`;

/* Forgot Password */

const ForgotPassword = styled.a`
  align-self: flex-end;

  margin-top: -12px;
  margin-bottom: 22px;

  color: #2f2f2f;
  font-size: 14px;
  font-weight: 500;

  text-decoration: none;

  transition: all 0.3s ease;

  &:hover {
    color: #00a8cc;
    text-decoration: underline;
  }
`;

/* Login Button */

const LoginButton = styled.button`
  width: 100%;
  height: 52px;

  border: none;
  border-radius: 12px;

  background: linear-gradient(
    135deg,
    #6c63ff,
    #00c6d7
  );

  color: white;

  font-size: 17px;
  font-weight: 600;

  cursor: pointer;

  box-shadow: 0 8px 20px rgba(108, 99, 255, 0.25);

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);

    box-shadow:
      0 12px 25px rgba(108, 99, 255, 0.35);

    background: linear-gradient(
      135deg,
      #5a50e8,
      #00aec0
    );
  }

  &:active {
    transform: translateY(0);
  }
`;

/* Sign Up Text */

const SignupText = styled.p`
  margin-top: 22px;

  text-align: center;

  color: #151414;
  font-size: 14px;
`;

const SignupLink = styled.a`
  color: #6c63ff;

  font-weight: 600;

  text-decoration: none;

  transition: all 0.3s ease;

  &:hover {
    color: #00a8cc;
    text-decoration: underline;
  }
`;
