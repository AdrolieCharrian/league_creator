"use client";
import React from "react";

export const LogOut = () => {
  const delete_cookie = (name) => {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    //can't use redirect on client side
    window.location.href = "/";
  };

  return (
    <div>
      <form action={() => delete_cookie("access-token")}>
        <button type="submit">LogOut</button>
      </form>
    </div>
  );
};
