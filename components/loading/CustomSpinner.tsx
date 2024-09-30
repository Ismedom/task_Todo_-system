//

import React from "react";

interface CustomSpinnerPros {
    w: number;
    h: number;
}

const CustomSpinner = ({ w, h }: CustomSpinnerPros) => {
    return (
        <div
            className="border-t-3 border-t-blue-600 rounded-full animate-spin duration-75"
            style={{ height: `${h}px`, width: `${w}px` }}></div>
    );
};

export default CustomSpinner;
