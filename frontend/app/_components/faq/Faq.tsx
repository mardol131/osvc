import Link from "next/link";
import React from "react";
import Question from "./Question";
import HeadingCenter from "../headings/HeadingCenter";

type Props = {};

export default function Faq({}: Props) {
  return (
    <div className=" flex items-start justify-center px-10 border-b py-30">
      <div className=" w-full flex flex-col items-center text-center max-w-200">
        <HeadingCenter
          heading="Máte otázky? Pojďme si je zodpovědět!"
          subheading="FAQ"
          text="Sledujeme zákony, připomínáme důležité termíny a dáváme Vám vědět, když se něco změní. Už žádné pokuty ani stres z neznámých povinností."
        />

        <div className="w-full flex flex-col gap-5">
          <Question
            heading="Co všechno hlídáme?"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi magnam voluptate sed asperiores explicabo doloremque, repudiandae nihil facere laudantium eum itaque at debitis nisi, ipsum veniam tenetur! Asperiores, nulla magnam?"
          />
          <Question
            heading="Děláme služby účetních?"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi magnam voluptate sed asperiores explicabo doloremque, repudiandae nihil facere laudantium eum itaque at debitis nisi, ipsum veniam tenetur! Asperiores, nulla magnam?"
          />
          <Question
            heading="Děláme služby účetních?"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi magnam voluptate sed asperiores explicabo doloremque, repudiandae nihil facere laudantium eum itaque at debitis nisi, ipsum veniam tenetur! Asperiores, nulla magnam?"
          />
          <Question
            heading="Děláme služby účetních?"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi magnam voluptate sed asperiores explicabo doloremque, repudiandae nihil facere laudantium eum itaque at debitis nisi, ipsum veniam tenetur! Asperiores, nulla magnam?"
          />
          <Question
            heading="Děláme služby účetních?"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi magnam voluptate sed asperiores explicabo doloremque, repudiandae nihil facere laudantium eum itaque at debitis nisi, ipsum veniam tenetur! Asperiores, nulla magnam?"
          />
          <Question
            heading="Děláme služby účetních?"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi magnam voluptate sed asperiores explicabo doloremque, repudiandae nihil facere laudantium eum itaque at debitis nisi, ipsum veniam tenetur! Asperiores, nulla magnam?"
          />
          <Question
            heading="Děláme služby účetních?"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi magnam voluptate sed asperiores explicabo doloremque, repudiandae nihil facere laudantium eum itaque at debitis nisi, ipsum veniam tenetur! Asperiores, nulla magnam?"
          />
        </div>
      </div>
    </div>
  );
}
