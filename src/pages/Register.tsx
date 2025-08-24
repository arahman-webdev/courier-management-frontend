import { RegisterForm } from "@/components/RegisterForm";
import registerImg from "../assets/images/register.png"

const Register = () => {
    return (
        <>
            <div className="relative min-h-screen w-full flex items-center justify-center  bg-cover  bg-center" 
            style={{ 
                background: `url(${registerImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }
            }
                >
                {/* Blurred overlay */}
                <div className="absolute inset-0 bg-white/30 backdrop-blur-md z-0" />

                {/* Login box */}
                <div className="relative z-10 flex w-full max-w-lg flex-col gap-6 p-6 bg-white/40 rounded-2xl shadow-lg backdrop-blur-sm">
                     <RegisterForm />
                </div>
            </div>
        </>


    );
};

export default Register;