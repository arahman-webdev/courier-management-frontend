import React from 'react';

const SectionTitle = ({title}: {title: string}) => {
    return (
        <div>
            <div className="">
                <h4 className="text-primary text-sm font-semibold tracking-widest mb-1 shadow-2xl rounded-[20px] border-b-2 border-primary inline-block px-7 py-3">
                    {title}
                </h4>
            </div>
        </div>
    );
};

export default SectionTitle;