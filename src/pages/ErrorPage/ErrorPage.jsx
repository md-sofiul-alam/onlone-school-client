import { Link, useRouteError } from "react-router-dom";
import fof from '../../../src/assets/nf404.gif'
import { Helmet } from "react-helmet-async";


const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className="flex justify-center items-center h-screen text-center bg-red-200">
            <Helmet>
                <title>EEE-SCHOOL - Error page</title>
            </Helmet>
            <div>
                <h1 className="text-6xl text-orange-500">Oops!</h1>
                <img className="w-full rounded-lg block mx-auto my-10" src={fof} alt="" />
                <p className="text-red-500">Sorry, an unexpected error has occurred.</p>
                <p className="text-red-500">
                    <i>{error.statusText || error.message}</i>
                </p>
                <Link className="btn" to='/'>Go Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;