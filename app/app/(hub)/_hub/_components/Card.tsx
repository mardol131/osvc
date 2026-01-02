import Image from "next/image";
import React from "react";
import Tag from "./Tag";
import Button from "@/app/_components/atoms/Button";
import { IoStar, IoMail, IoCall } from "react-icons/io5";

type Props = {
  name: string;
  websiteUrl: string;
  priceRange: string;
  logoUrl: string;
  imageUrl?: string;
  description: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  phone?: string;
  email?: string;
};

export default function Card({
  name,
  websiteUrl,
  priceRange,
  logoUrl,
  imageUrl,
  description,
  category,
  tags = [],
  featured = false,
  phone,
  email,
}: Props) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-56 bg-linear-to-br from-zinc-800 to-zinc-900 overflow-hidden">
          <Image
            src={imageUrl}
            fill
            alt={`${name} náhled`}
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Logo over image */}
          <div className="absolute bottom-4 left-4 shrink-0 w-13 h-13 bg-white rounded-xl shadow-xl border-2 border-white flex items-center justify-center p-2">
            <Image
              src={logoUrl}
              width={100}
              height={100}
              alt={`${name} logo`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Header s názvem a kategorií */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h5 className="text-xl  r font-semibold text-primary group-hover:text-secondary transition-colors mb-1">
              {name}
            </h5>
            {category && (
              <p className="text-xs text-secondary font-semibold uppercase  r">
                {category}
              </p>
            )}
          </div>

          {/* Featured tag */}
          {featured && (
            <Tag text="Doporučeno" icon={<IoStar className="text-base" />} />
          )}
        </div>

        {/* Popisek */}
        <p className="text-sm text-textP leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Informace - minimalistická sekce */}
        <div className="flex flex-col gap-2 py-3 border-t border-zinc-200">
          {/* Cena */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-textP">Cena:</span>
            <span className="font-semibold text-primary">{priceRange}</span>
          </div>

          {/* Telefon */}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 text-sm text-textP hover:text-secondary transition-colors"
            >
              <IoCall className="text-base shrink-0" />
              <span>{phone}</span>
            </a>
          )}

          {/* Email */}
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-sm text-textP hover:text-secondary transition-colors"
            >
              <IoMail className="text-base shrink-0" />
              <span className="truncate">{email}</span>
            </a>
          )}
        </div>

        {/* Tagy */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        )}

        {/* CTA tlačítko */}
        <Button
          href={websiteUrl}
          target="_blank"
          text="Navštívit web"
          variant="black"
          size="sm"
          className="mt-2"
        />
      </div>
    </div>
  );
}
