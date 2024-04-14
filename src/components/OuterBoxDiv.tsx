import React from 'react';

// Modify the component to accept props
interface CenteredBoxDivProps {
    children: React.ReactNode;
}
const OuterBoxDiv: React.FC<CenteredBoxDivProps> = ({children}) => {


    return (
        <div className="flex flex-col overflow-hidden justify-center items-center min-h-screen">
            {children}
        </div>
    );
};

export default OuterBoxDiv;