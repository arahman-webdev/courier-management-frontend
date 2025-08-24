import { Link } from "react-router";


const Unauthorized = () => {
    return (
        <div>
            <div className="flex flex-col min-h-screen items-center justify-center">
                <h1>You are an unauthorized user</h1>
                <span>Back to <Link to={'/'}>Home</Link></span>
                
            </div>
        </div>
    );
};

export default Unauthorized;