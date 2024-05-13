"use server";

import {redirect} from "next/navigation";

const delete_cookie = (name) => {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export async function navigate() {
  delete_cookie("access-token");
  redirect(`/`);
}
