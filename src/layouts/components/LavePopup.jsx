import React from "react";

const LeavePopup = ({ onCancel, onLeave }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 shadow-xl border-4 border-yellow-500 rounded-2xl p-8 w-11/12 max-w-lg animate-popup transition-all duration-300 ease-out">
        {/* Decorative Chess Pieces */}

        {/* Heading & Message */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-yellow-700 drop-shadow-sm">
            Are you sure?
          </h2>
          <p className="mt-3 text-yellow-800 font-medium">
            Your current chess game will be lost if you leave now.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-full bg-white text-yellow-700 border border-yellow-500 hover:bg-yellow-100 transition-all duration-200 font-semibold shadow-sm"
          >
            Stay
          </button>
          <button
            onClick={onLeave}
            className="px-6 py-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-200 font-semibold shadow-sm"
          >
            Leave Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeavePopup;
