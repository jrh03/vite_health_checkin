import React from 'react';

// Modify the component to accept props
interface CenteredBoxProps {
    children: React.ReactNode;
}
const CenteredBox: React.FC<CenteredBoxProps> = ({children}) => {


    return (
            <div className="flex flex-col justify-between bg-white p-6 rounded shadow-lg min-w-full md:min-w-min md:min-h-1/2 m-auto">
                {children}
            </div>
    );
};

export default CenteredBox;
