import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext)

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(res => {
                const loggedUser = res?.user;
                const saveUser = { name: loggedUser.displayName, email: loggedUser.email, image: loggedUser.photoURL }
                fetch('https://eee-school.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId || !data.insertedId) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'User data updated Successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            })

                            navigate(from, { replace: true })
                        }

                    })

            })

    }

    return (
        <div>
            <div className="divider"></div>
            <div className="w-full text-center my-4">
                <div className="flex cursor-pointer w-10/12 mx-auto p-2 gap-2 align-middle items-center justify-center hover:bg-red-100 bg-red-200 rounded-lg " onClick={handleGoogleSignIn}>
                    <p className="text-lg"><FcGoogle /></p>
                    <p className="text-green-700 font-semibold">Login With Google</p>

                </div>
            </div>
        </div>
    );
};

export default SocialLogin;