import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Wrapper({ children }: Props) {
  return <div>{children}</div>;
}
