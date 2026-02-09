import { redirect } from "next/navigation";

export function scrollToElement(id: string) {
  const currentPath = window.location.pathname;
  if (currentPath === "/") {
    const element = document.querySelector(`#${id}`);
    element?.scrollIntoView({ behavior: "smooth" });
  } else {
    redirect(`/#${id}`);
  }
}
