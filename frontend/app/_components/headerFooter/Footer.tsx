import React from "react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className=" bg-primary flex items-center justify-center px-10  py-30"
    >
      <div className="max-w-wrapper w-full flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col gap-5 items-center">
          <h4 className="text-textLight">Kontakt</h4>
          <a href="mailto:info@osvcportal.cz" className="text-textLight">
            info@osvcportal.cz
          </a>
          <a href="tel:info@osvcportal.cz" className="text-textLight">
            +420 735 202 345
          </a>
          <p className="text-textLight">IČO: 10796509</p>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <h4 className="text-textLight">Dokumenty</h4>
          <a href="/podminky.pdf" className="text-textLight">
            Obchodní podmínky
          </a>
          <a href="/gdpr.pdf" className="text-textLight">
            GDPR
          </a>
        </div>
      </div>
    </footer>
  );
}
