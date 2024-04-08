import React from 'react';

// Modify the component to accept props
interface CenteredBoxProps {
    children: React.ReactNode;
}
const CenteredBox: React.FC<CenteredBoxProps> = ({children}) => {


    return (
        <div className="flex justify-center items-center w-full h-full sm:w-1/2 sm:h-1/2">
            <div className="flex flex-col justify-between bg-white p-6 rounded shadow-lg w-full h-5/6 md:w-1/2 md:h-1/2 overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default CenteredBox;
