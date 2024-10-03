import React from "react";

const TextLoading = () => {
    return (
        <div className="text-gray-100" style={{ display: "inline-block" }}>
            Loading
            <span className="dot" style={dotStyle}>
                .
            </span>
            <span className="dot" style={{ ...dotStyle, animationDelay: "0.2s" }}>
                .
            </span>
            <span className="dot" style={{ ...dotStyle, animationDelay: "0.4s" }}>
                .
            </span>
            <style jsx>{`
                @keyframes blink {
                    0% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
                .dot {
                    animation: blink 1.4s infinite;
                    animation-fill-mode: both;
                }
            `}</style>
        </div>
    );
};

const dotStyle = {
    marginLeft: "2px",
};

export default TextLoading;
