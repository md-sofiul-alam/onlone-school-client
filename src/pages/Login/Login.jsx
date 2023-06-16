import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/Shared/SocialLogin";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import image from "../../assets/images/Login-img.gif"

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [show, setShow] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleShow = () => {
    setShow(!show);
    console.log(show);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Success fully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="md:grid md:grid-cols-2 m-auto">
      <div className="md:col-span-1 m-auto">
        <img src={image} alt="" className="w-screen my-4 mx-10 rounded-lg"/>
      </div>
      <div className="md:col-span-1">
      <div>
      <Helmet>
        <title>EEE-SCHOOL - Login</title>
      </Helmet>
      <div className="hero bg-opacity-0  mb-3 bg-base-200">
        <div className="hero-content">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h2 className="text-3xl text-center font-bold text-gray-600 mt-6">
              Login Now
            </h2>
            <form onSubmit={handleLogin} className="card-body m-0">
              <div className="form-control -mt-6">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control -mt-3 relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={show ? "password" : "text"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <div className="form-control absolute right-1 top-[58px]">
                  <label className="label cursor-pointer justify-end">
                    <span className="label-text me-3">
                      <span
                        className="text-yellow-600 font-bold"
                        onClick={handleShow}
                      >
                        {show ? <BsEyeSlash className="text-xl text-gray-500" /> :<BsEye className="text-xl text-gray-500"/>}
                      </span>
                    </span>
                  </label>
                </div>
                <div className="flex justify-between">
                  <label className="label">
                    <a href="#" className="label-text-alt link text-base link-hover">
                      Forgot password?
                    </a>
                  </label>
                  <label className="label">
                    <p>New Here? <span><Link
                      to="/signup"
                      className="label-text-alt text-base link link-hover text-blue-600"
                    >
                      Sign Up
                    </Link></span></p>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
           <SocialLogin/>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Login;
