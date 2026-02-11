"use client";

import { getCollection } from "@/app/_functions/backend";
import React, { useEffect } from "react";
import { notFound } from "next/navigation";
import { stringify } from "qs-esm";
import SubscriptionManagementCard from "./subscription-management-card";
import UserSectionWrapper from "@/app/_components/blocks/user-section-wrapper";
import { Lightbulb } from "lucide-react";
import HeadingCenter from "@/app/_components/blocks/headings/HeadingCenter";
import { useAuth } from "@/app/_context/auth-context";
import UserLoginScreen from "./user-login-screen";
import LoadErrorState from "@/app/(pages)/(access)/[accessId]/_components/LoadErrorState";
import Button from "@/app/_components/atoms/Button";
import GeneralSettings from "./general-settings";

type Props = {
  allActivityGroups: any[];
};

export default function SubscriptionManagement({ allActivityGroups }: Props) {
  const [subscribes, setSubscribes] = React.useState<any[]>([]);
  const auth = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await getCollection({
          collectionSlug: "subscribes",
        });
        setSubscribes(response);
      } catch (error: any) {
        setSubscribes([]);
      }
    })();
  }, [auth.user]);

  if (!auth.user) {
    return (
      <div className="mt-20">
        <UserLoginScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50">
      {" "}
      <UserSectionWrapper levelTwo={{ className: "items-center pt-20" }}>
        {/* Hlavička */}
        <HeadingCenter
          subheading="Správa předplatného"
          heading="Spravujte své předplatné a notifikace"
          text="Přehled aktivních předmětů podnikání a možnost dokoupení dalších podle vašich potřeb."
        />
      </UserSectionWrapper>
      <div className="flex flex-col w-full gap-10">
        <UserSectionWrapper>
          {/* Info box o přidávání/odebírání předmětů */}
          <div className="rounded-xl border w-full p-10 max-md:p-4 bg-white border-zinc-100 shadow-md">
            <div className="flex gap-4">
              {" "}
              <div className="w-15 h-15 shrink-0 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center">
                <Lightbulb strokeWidth={1.5} size={30} />
              </div>
              <div className="shrink-0"></div>
              <div>
                <h4 className="text-lg font-bebas text-primary mb-3">
                  Odebírání skupin předmětů
                </h4>
                <p className="text-textP leading-relaxed">
                  V tuto chvíli není možné odebírat jednotlivé předměty
                  podnikání z vašeho předplatného. Na této funkci pracujeme.
                  Pokud chcete nějaký předmět podnikání odebrat, napište nám na
                  email info@osvc365.cz.
                </p>
              </div>
            </div>
          </div>
        </UserSectionWrapper>
        {/* Obecná nastavení */}
        <UserSectionWrapper>
          <GeneralSettings />
        </UserSectionWrapper>
        {/* Správa předplatného */}
        <UserSectionWrapper>
          {subscribes.length > 0 ? (
            <div className="w-full flex flex-col gap-10 pb-20">
              {subscribes.map((subscribe, index) => (
                <SubscriptionManagementCard
                  index={index}
                  key={subscribe.id}
                  allActivityGroups={allActivityGroups}
                  subscribe={subscribe}
                />
              ))}
            </div>
          ) : (
            <div className="mt-20 text-center flex flex-col gap-4 items-center">
              <h3>Žádné aktivní předplatné nebylo nalezeno.</h3>
              <p>
                Pro aktivaci předplatného si prosím zakupte některé z našich
                předplatných.
              </p>
              <Button text="Zakoupit předplatné" href="/koupit-predplatne" />
            </div>
          )}
        </UserSectionWrapper>
      </div>
    </div>
  );
}
