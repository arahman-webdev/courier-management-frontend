
import { Truck } from 'lucide-react';
import bg2 from '../../../assets/images/bg2.png'
import deliveryMan from '../../../assets/images/delivery-man.png'

const ChooseUs = () => {
    return (
        <div>
            <div className="relative group  overflow-hidden shadow-md transition-all duration-500 ">
                {/* Background Image (hover effect) */}
                <div
                    className="absolute inset-0 bg-cover bg-center  opacity-100  transition-all duration-700"
                    style={{ backgroundImage: `url(${bg2})` }}
                />
                <div className="absolute inset-0 bg-[#070f1d]/92 opacity-100"></div>
                {/* content from here starting */}
                <div className='relative z-10  pt-16 container mx-auto'>
                    <div className="text-center">
                        <h4 className="text-white text-sm font-semibold tracking-widest mb-1 shadow-2xl rounded-[20px] border-b-2 border-primary inline-block px-7 py-3">
                            WHY CHOOSE US
                        </h4>
                        <div>
                            <h2 className='text-5xl text-white font-bold'>WHY CHOOSE FOR US</h2>
                            <p className='text-gray-100'>Dramatically enhance interactive metrics for reliable services. Proactively unleash fully researched e-commerce.</p>
                        </div>
                    </div>
                    <div className='flex justify-between pt-12'>
                        <div>
                            <div className='flex gap-4'>
                                <i className=''><Truck className='bg-primary text-white p-4 rounded-full' size={60} /> </i>
                                <div className='space-y-5'>
                                    <h6 className='font-semibold text-xl text-white'>FAST TRANSPORTION SERVICE</h6>
                                    <p className='text-gray-100'>Enhance interactive metrics for reliable services. Proactively unleash fully researched.</p>
                                </div>
                            </div>
                            <div className='flex gap-4 pt-5'>
                                <i className=''><Truck className='bg-primary text-white p-4 rounded-full' size={60} /> </i>
                                <div className='space-y-5'>
                                    <h6 className='font-semibold text-xl text-white'>FAST TRANSPORTION SERVICE</h6>
                                    <p className='text-gray-100'>Enhance interactive metrics for reliable services. Proactively unleash fully researched.</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={deliveryMan} alt="" />
                        </div>
                        <div>
                            <div className='flex gap-4'>
                                <i className=''><Truck className='bg-primary text-white p-4 rounded-full' size={60} /> </i>
                                <div className='space-y-5'>
                                    <h6 className='font-semibold text-xl text-white'>FAST TRANSPORTION SERVICE</h6>
                                    <p className='text-gray-100'>Enhance interactive metrics for reliable services. Proactively unleash fully researched.</p>
                                </div>
                            </div>
                            <div className='flex gap-4 pt-5'>
                                <i className=''><Truck className='bg-primary text-white p-4 rounded-full' size={60} /> </i>
                                <div className='space-y-5'>
                                    <h6 className='font-semibold text-xl text-white'>FAST TRANSPORTION SERVICE</h6>
                                    <p className='text-gray-100'>Enhance interactive metrics for reliable services. Proactively unleash fully researched.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;