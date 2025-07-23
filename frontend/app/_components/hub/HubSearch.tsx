"use client";

import { hubDataList } from "@/app/_data/hubData";
import Image from "next/image";
import React from "react";

type Props = {};

export default function HubSearch({}: Props) {
  return (
    <div className=" flex items-center justify-center md:px-10 px-4 md:py-30 py-20">
      <div className=" w-full grid grid-cols-[1fr_4fr] gap-5 max-w-400">
        <div>
          <div className="flex flex-col gap-8">
            {hubDataList.map((group) => {
              return (
                <div key={group.groupName}>
                  <h4 className="mb-3 text-secondary">{group.groupName}</h4>
                  <ul className="text-xl ml-5 flex flex-col gap-2">
                    {group.groupData.map((item) => {
                      return (
                        <li key={item.name}>
                          <p>- {item.name}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          {" "}
          <div className="grid grid-cols-3 gap-10">
            <div className=" bg-zinc-100/50 shadow-lg w-full min-h-60 rounded-lg p-3 flex flex-col gap-4 items-start">
              <div className="bg-zinc-800/80 w-full self-stretch h-60 rounded-lg"></div>
              <div className="flex items-center gap-4">
                <Image
                  src={"https://www.facebook.com/favicon.ico"}
                  width={100}
                  height={100}
                  alt="serviceIcon"
                  className="h-10 w-auto"
                />
                <h5>Jméno</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                necessitatibus sapiente accusamus officiis dignissimos
                excepturi, voluptatum cumque porro autem. Qui, provident.
                Sapiente, minima! Aperiam debitis quia, eos velit perspiciatis
                optio!
              </p>{" "}
              <button className=" shadow-lg md:text-lg text-lg uppercase font-semibold py-2 md:px-3 px-3 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center hover:scale-105 transition-all ease-in-out cursor-pointer">
                Odkaz
              </button>
            </div>
            <div className=" bg-zinc-100/50 shadow-lg w-full min-h-60 rounded-lg p-3 flex flex-col gap-4 items-start">
              <div className="bg-zinc-800/80 w-full self-stretch h-60 rounded-lg"></div>
              <div className="flex items-center gap-4">
                <Image
                  src={"https://www.facebook.com/favicon.ico"}
                  width={100}
                  height={100}
                  alt="serviceIcon"
                  className="h-10 w-auto"
                />
                <h5>Jméno</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                necessitatibus sapiente accusamus officiis dignissimos
                excepturi, voluptatum cumque porro autem. Qui, provident.
                Sapiente, minima! Aperiam debitis quia, eos velit perspiciatis
                optio!
              </p>{" "}
              <button className=" shadow-lg md:text-lg text-lg uppercase font-semibold py-2 md:px-3 px-3 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center hover:scale-105 transition-all ease-in-out cursor-pointer">
                Odkaz
              </button>
            </div>{" "}
            <div className=" bg-zinc-100/50 shadow-lg w-full min-h-60 rounded-lg p-3 flex flex-col gap-4 items-start">
              <div className="bg-zinc-800/80 w-full self-stretch h-60 rounded-lg"></div>
              <div className="flex items-center gap-4">
                <Image
                  src={"https://www.facebook.com/favicon.ico"}
                  width={100}
                  height={100}
                  alt="serviceIcon"
                  className="h-10 w-auto"
                />
                <h5>Jméno</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                necessitatibus sapiente accusamus officiis dignissimos
                excepturi, voluptatum cumque porro autem. Qui, provident.
                Sapiente, minima! Aperiam debitis quia, eos velit perspiciatis
                optio!
              </p>{" "}
              <button className=" shadow-lg md:text-lg text-lg uppercase font-semibold py-2 md:px-3 px-3 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center hover:scale-105 transition-all ease-in-out cursor-pointer">
                Odkaz
              </button>
            </div>{" "}
            <div className=" bg-zinc-100/50 shadow-lg w-full min-h-60 rounded-lg p-3 flex flex-col gap-4 items-start">
              <div className="bg-zinc-800/80 w-full self-stretch h-60 rounded-lg"></div>
              <div className="flex items-center gap-4">
                <Image
                  src={"https://www.facebook.com/favicon.ico"}
                  width={100}
                  height={100}
                  alt="serviceIcon"
                  className="h-10 w-auto"
                />
                <h5>Jméno</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                necessitatibus sapiente accusamus officiis dignissimos
                excepturi, voluptatum cumque porro autem. Qui, provident.
                Sapiente, minima! Aperiam debitis quia, eos velit perspiciatis
                optio!
              </p>{" "}
              <button className=" shadow-lg md:text-lg text-lg uppercase font-semibold py-2 md:px-3 px-3 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center hover:scale-105 transition-all ease-in-out cursor-pointer">
                Odkaz
              </button>
            </div>{" "}
            <div className=" bg-zinc-100/50 shadow-lg w-full min-h-60 rounded-lg p-3 flex flex-col gap-4 items-start">
              <div className="bg-zinc-800/80 w-full self-stretch h-60 rounded-lg"></div>
              <div className="flex items-center gap-4">
                <Image
                  src={"https://www.facebook.com/favicon.ico"}
                  width={100}
                  height={100}
                  alt="serviceIcon"
                  className="h-10 w-auto"
                />
                <h5>Jméno</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                necessitatibus sapiente accusamus officiis dignissimos
                excepturi, voluptatum cumque porro autem. Qui, provident.
                Sapiente, minima! Aperiam debitis quia, eos velit perspiciatis
                optio!
              </p>{" "}
              <button className=" shadow-lg md:text-lg text-lg uppercase font-semibold py-2 md:px-3 px-3 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center hover:scale-105 transition-all ease-in-out cursor-pointer">
                Odkaz
              </button>
            </div>{" "}
            <div className=" bg-zinc-100/50 shadow-lg w-full min-h-60 rounded-lg p-3 flex flex-col gap-4 items-start">
              <div className="bg-zinc-800/80 w-full self-stretch h-60 rounded-lg"></div>
              <div className="flex items-center gap-4">
                <Image
                  src={"https://www.facebook.com/favicon.ico"}
                  width={100}
                  height={100}
                  alt="serviceIcon"
                  className="h-10 w-auto"
                />
                <h5>Jméno</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                necessitatibus sapiente accusamus officiis dignissimos
                excepturi, voluptatum cumque porro autem. Qui, provident.
                Sapiente, minima! Aperiam debitis quia, eos velit perspiciatis
                optio!
              </p>{" "}
              <button className=" shadow-lg md:text-lg text-lg uppercase font-semibold py-2 md:px-3 px-3 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center hover:scale-105 transition-all ease-in-out cursor-pointer">
                Odkaz
              </button>
            </div>{" "}
            <div className=" bg-zinc-100/50 shadow-lg w-full min-h-60 rounded-lg p-3 flex flex-col gap-4 items-start">
              <div className="bg-zinc-800/80 w-full self-stretch h-60 rounded-lg"></div>
              <div className="flex items-center gap-4">
                <Image
                  src={"https://www.facebook.com/favicon.ico"}
                  width={100}
                  height={100}
                  alt="serviceIcon"
                  className="h-10 w-auto"
                />
                <h5>Jméno</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                necessitatibus sapiente accusamus officiis dignissimos
                excepturi, voluptatum cumque porro autem. Qui, provident.
                Sapiente, minima! Aperiam debitis quia, eos velit perspiciatis
                optio!
              </p>{" "}
              <button className=" shadow-lg md:text-lg text-lg uppercase font-semibold py-2 md:px-3 px-3 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center hover:scale-105 transition-all ease-in-out cursor-pointer">
                Odkaz
              </button>
            </div>{" "}
            <div className=" bg-zinc-100/50 shadow-lg w-full min-h-60 rounded-lg p-3 flex flex-col gap-4 items-start">
              <div className="bg-zinc-800/80 w-full self-stretch h-60 rounded-lg"></div>
              <div className="flex items-center gap-4">
                <Image
                  src={"https://www.facebook.com/favicon.ico"}
                  width={100}
                  height={100}
                  alt="serviceIcon"
                  className="h-10 w-auto"
                />
                <h5>Jméno</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                necessitatibus sapiente accusamus officiis dignissimos
                excepturi, voluptatum cumque porro autem. Qui, provident.
                Sapiente, minima! Aperiam debitis quia, eos velit perspiciatis
                optio!
              </p>{" "}
              <button className=" shadow-lg md:text-lg text-lg uppercase font-semibold py-2 md:px-3 px-3 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center hover:scale-105 transition-all ease-in-out cursor-pointer">
                Odkaz
              </button>
            </div>{" "}
            <div className=" bg-zinc-100/50 shadow-lg w-full min-h-60 rounded-lg p-3 flex flex-col gap-4 items-start">
              <div className="bg-zinc-800/80 w-full self-stretch h-60 rounded-lg"></div>
              <div className="flex items-center gap-4">
                <Image
                  src={"https://www.facebook.com/favicon.ico"}
                  width={100}
                  height={100}
                  alt="serviceIcon"
                  className="h-10 w-auto"
                />
                <h5>Jméno</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                necessitatibus sapiente accusamus officiis dignissimos
                excepturi, voluptatum cumque porro autem. Qui, provident.
                Sapiente, minima! Aperiam debitis quia, eos velit perspiciatis
                optio!
              </p>{" "}
              <button className=" shadow-lg md:text-lg text-lg uppercase font-semibold py-2 md:px-3 px-3 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center hover:scale-105 transition-all ease-in-out cursor-pointer">
                Odkaz
              </button>
            </div>{" "}
            <div className=" bg-zinc-100/50 shadow-lg w-full min-h-60 rounded-lg p-3 flex flex-col gap-4 items-start">
              <div className="bg-zinc-800/80 w-full self-stretch h-60 rounded-lg"></div>
              <div className="flex items-center gap-4">
                <Image
                  src={"https://www.facebook.com/favicon.ico"}
                  width={100}
                  height={100}
                  alt="serviceIcon"
                  className="h-10 w-auto"
                />
                <h5>Jméno</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                necessitatibus sapiente accusamus officiis dignissimos
                excepturi, voluptatum cumque porro autem. Qui, provident.
                Sapiente, minima! Aperiam debitis quia, eos velit perspiciatis
                optio!
              </p>{" "}
              <button className=" shadow-lg md:text-lg text-lg uppercase font-semibold py-2 md:px-3 px-3 bg-primary text-textLight rounded-lg font-oswald flex items-center justify-center hover:scale-105 transition-all ease-in-out cursor-pointer">
                Odkaz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
