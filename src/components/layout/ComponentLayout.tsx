import  { type ReactNode } from 'react';
import { Navbar } from './Navbar';
import Footer from './Footer';


interface IProps {
    children: ReactNode
}

const ComponentLayout = ({ children }: IProps) => {
    return (
        <div className='flex min-h-screen flex-col'>
            <Navbar />
            <div className='grow-1'>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default ComponentLayout;