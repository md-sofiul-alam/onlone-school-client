import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../components/Shared/SocialLogin";
import image from "../../assets/images/Login-img.gif"

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      return Swal.fire("Confirmation password not match");
    }

    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.url).then(() => {
        // send data to server
        const saveUser = {
          name: data.name,
          email: data.email,
          image: data.url,
        };

        fetch("https://eee-school.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User data updated Successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
      });
    });
  };

  return (
    <div className="md:grid grid-cols-2">
        <div className="md:col-span-1 mx-auto mt-12">
          <img src={image} alt="" className="w-screen ml-10 rounded-lg" />
        </div>
      <div>
        <Helmet>
          <title>EEE-SCHOOL - Sign Up</title>
        </Helmet>
        <div className="hero bg-opacity-0  mb-6 bg-base-200">
          <div className="hero-content w-1/2">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <h2 className="text-3xl text-center font-bold -mb-6 text-gray-500 mt-4 mx-auto">
                Sign Up
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="card-body m-0">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="name"
                    name="name"
                    placeholder="name"
                    className="input input-bordered"
                  />
                  {errors.name && <span>This field is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text -mt-4">Email</span>
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                  {errors.email && <span>This field is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text -mt-4">Password</span>
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                    })}
                    placeholder="password"
                    className="input input-bordered"
                  />
                  {errors.password?.type === "required" && (
                    <p>Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p>Password is less than 6 characters</p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p>
                      Password don't have a capital letter or special character
                      or both
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text -mt-4">Confirm Password</span>
                  </label>
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text -mt-4">Photo URL</span>
                  </label>
                  <input
                    {...register("url", { required: true })}
                    type="url"
                    name="url"
                    placeholder="url"
                    className="input input-bordered"
                  />
                  {errors.url && <span>This field is required</span>}
                </div>
                <label className="label -mt-4">
                  <p>
                    Have an account?{" "}
                    <Link
                      to="/login"
                      className="label-text-alt link link-hover -mt-4 text-base text-blue-600"
                    >
                      Login
                    </Link>
                  </p>
                </label>
                <div className="form-control mt-2 -mb4">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Sign Up"
                  />
                </div>
              </form>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
