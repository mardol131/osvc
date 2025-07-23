import { redirect } from "next/navigation";

export function scrollToElement(id: string) {
  const currentPath = window.location.pathname;
  console.log(currentPath);
  if (currentPath === "/") {
    const element = document.querySelector(`#${id}`);
    element?.scrollIntoView({ behavior: "smooth" });
  } else {
    redirect(`/#${id}`);
  }
}
