import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-70vh">
        <div className="flex bg-neutral-700 rounded-lg w-9/12 h-9/10 min-w-max">
          <div className="bg-transparent w-full md:w-5/12 lg:w-2/4" />
          <div className="bg-login-image-bg hidden rounded-r-lg md:w-7/12 md:flex lg:flex lg:w-2/4 items-center">
            <img src="/images/login.jpg" alt="login" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
