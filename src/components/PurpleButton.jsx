import React from "react";

export const PurpleButton = ({ children, ...rest }) => (
  <button
    {...rest}
    className="rounded-full font-playfair bg-violet-200 py-1 px-4 hover:bg-violet-300 active:bg-violet-400 "
  >
    {children}
  </button>
);
