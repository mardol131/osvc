"use client";

import { BusinessActivity } from "@/app/_data/businessActivities";
import React, { useState } from "react";
import Button from "@/app/_components/atoms/Button";
import {
  sendGeneralNotification,
  Notification,
} from "@/app/_functions/backend";

type Props = {
  activityGroups: BusinessActivity[];
};

type FormData = {
  general: Notification[];
  [key: string]: Notification[];
};

export default function Dashboard({ activityGroups }: Props) {
  const [formData, setFormData] = useState<FormData>({
    general: [{ text: "", date: "", link: "" }],
  });
  console.log(activityGroups);
  const [password, setPassword] = useState("");

  const [showModal, setShowModal] = useState(false);

  // Initialize form data with activity groups
  React.useEffect(() => {
    const initialData: FormData = {
      general: [{ text: "", date: "", link: "" }],
    };
    activityGroups.forEach((group) => {
      initialData[group.slug] = [{ text: "", date: "", link: "" }];
    });
    setFormData(initialData);
  }, [activityGroups]);

  const addInput = (section: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], { text: "", date: "", link: "" }],
    }));
  };

  const removeInput = (section: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const updateInput = (
    section: string,
    index: number,
    field: keyof Notification,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    const cleanedData: FormData = {
      general: formData.general.filter((item) => item.text.trim() !== ""),
    };

    activityGroups.forEach((group) => {
      cleanedData[group.slug] = (formData[group.slug] || []).filter(
        (item) => item.text.trim() !== ""
      );
    });

    const messages = {
      general: cleanedData.general,
      it_services: cleanedData["it_services"] || [],
      consulting: cleanedData["consulting"] || [],
      marketing: cleanedData["marketing"] || [],
      education: cleanedData["education"] || [],
      culture_sports: cleanedData["culture_sport"] || [],
    };

    try {
      await sendGeneralNotification(messages, password);
    } catch (error) {
      console.error("Chyba při odesílání obecných oznámení:", error);
    }

    setShowModal(false);
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4">
          {/* Left Column - Forms */}
          <div className="flex-1">
            {/* General Section */}
            <SectionCard
              title="Obecná sekce"
              sectionKey="general"
              inputs={formData.general || []}
              addInput={addInput}
              removeInput={removeInput}
              updateInput={updateInput}
            />

            {/* Activity Groups Sections */}
            {activityGroups.map((group) => (
              <SectionCard
                key={group.slug}
                title={group.name}
                sectionKey={group.slug}
                inputs={formData[group.slug] || []}
                addInput={addInput}
                removeInput={removeInput}
                updateInput={updateInput}
              />
            ))}

            {/* Submit Button */}
            <div className="mt-3 flex justify-end">
              <Button
                text="Odeslat"
                onClick={handleSubmit}
                variant="gold"
                size="sm"
              />
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white border border-zinc-300 rounded p-3">
              <h3 className="text-sm font-semibold text-primary mb-3 pb-2 border-b border-zinc-200">
                Náhled zprávy
              </h3>
              <div className="space-y-3 text-xs">
                {/* General items */}
                {formData.general?.filter((item) => item.text.trim() !== "")
                  .length > 0 && (
                  <div>
                    <div className="font-medium text-zinc-700 mb-1">
                      Obecná sekce:
                    </div>
                    <ul className="space-y-2">
                      {formData.general
                        .filter((item) => item.text.trim() !== "")
                        .map((item, idx) => (
                          <li key={idx} className="text-zinc-600 pl-3">
                            <div>• {item.text}</div>
                            {item.date && (
                              <div className="text-zinc-500 text-[10px] ml-3">
                                📅 {item.date}
                              </div>
                            )}
                            {item.link && (
                              <div className="text-blue-600 text-[10px] ml-3 truncate">
                                🔗 {item.link}
                              </div>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Activity groups items */}
                {activityGroups.map((group) => {
                  const items =
                    formData[group.slug]?.filter(
                      (item) => item.text.trim() !== ""
                    ) || [];
                  if (items.length === 0) return null;

                  return (
                    <div key={group.slug}>
                      <div className="font-medium text-zinc-700 mb-1">
                        {group.name}:
                      </div>
                      <ul className="space-y-2">
                        {items.map((item, idx) => (
                          <li key={idx} className="text-zinc-600 pl-3">
                            <div>• {item.text}</div>
                            {item.date && (
                              <div className="text-zinc-500 text-[10px] ml-3">
                                📅 {item.date}
                              </div>
                            )}
                            {item.link && (
                              <div className="text-blue-600 text-[10px] ml-3 truncate">
                                🔗 {item.link}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}

                {/* Empty state */}
                {formData.general?.filter((item) => item.text.trim() !== "")
                  .length === 0 &&
                  activityGroups.every(
                    (group) =>
                      !formData[group.slug]?.some(
                        (item) => item.text.trim() !== ""
                      )
                  ) && (
                    <div className="text-zinc-400 text-center py-8">
                      Žádný obsah k zobrazení
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          onConfirm={confirmSubmit}
          onCancel={() => {
            setShowModal(false);
            setPassword("");
          }}
          password={password}
          setPassword={setPassword}
        />
      )}
    </div>
  );
}

// Section Card Component
type SectionCardProps = {
  title: string;
  sectionKey: string;
  inputs: Notification[];
  addInput: (section: string) => void;
  removeInput: (section: string, index: number) => void;
  updateInput: (
    section: string,
    index: number,
    field: keyof Notification,
    value: string
  ) => void;
};

function SectionCard({
  title,
  sectionKey,
  inputs,
  addInput,
  removeInput,
  updateInput,
}: SectionCardProps) {
  return (
    <div className="bg-white border border-zinc-300 rounded p-3 mb-2">
      {/* Section Header */}
      <div className="mb-2 pb-1 border-b border-zinc-200">
        <h5 className="text-primary">{title}</h5>
      </div>

      {/* Dynamic Inputs */}
      <div className="space-y-3 mb-2">
        {inputs.map((item, index) => (
          <div
            key={index}
            className="border border-zinc-200 rounded p-2 group hover:border-zinc-300"
          >
            <div className="flex gap-1.5 items-start mb-1.5">
              <div className="flex-1">
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) =>
                    updateInput(sectionKey, index, "text", e.target.value)
                  }
                  placeholder="Text zprávy"
                  className="w-full px-2 py-1.5 rounded border border-zinc-300 focus:border-secondary focus:outline-none text-xs text-primary"
                />
              </div>
              <button
                onClick={() => removeInput(sectionKey, index)}
                className="w-6 h-6 flex items-center justify-center rounded bg-white border border-red-300 text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 text-xs flex-shrink-0"
                title="Odstranit"
              >
                ✕
              </button>
            </div>
            <div className="flex gap-1.5">
              <input
                type="date"
                value={item.date || ""}
                onChange={(e) =>
                  updateInput(sectionKey, index, "date", e.target.value)
                }
                className="flex-1 px-2 py-1 rounded border border-zinc-300 focus:border-secondary focus:outline-none text-xs text-primary"
                placeholder="Datum (volitelné)"
              />
              <input
                type="url"
                value={item.link || ""}
                onChange={(e) =>
                  updateInput(sectionKey, index, "link", e.target.value)
                }
                placeholder="Odkaz (volitelné)"
                className="flex-1 px-2 py-1 rounded border border-zinc-300 focus:border-secondary focus:outline-none text-xs text-primary"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={() => addInput(sectionKey)}
        className="w-full py-1.5 px-2 rounded border border-secondary/40 bg-secondary/5 text-primary text-xs font-medium hover:bg-secondary/10 transition-colors flex items-center justify-center gap-1"
      >
        <span>+</span>
        Přidat položku
      </button>
    </div>
  );
}

// Confirmation Modal Component
type ConfirmationModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
  password: string;
  setPassword: (value: string) => void;
};

function ConfirmationModal({
  onConfirm,
  onCancel,
  password,
  setPassword,
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Content */}
        <h3 className="text-xl font-bold text-primary mb-2">
          Potvrdit odeslání?
        </h3>
        <p className="text-zinc-600 text-sm mb-4">
          Opravdu chcete odeslat všechna vyplněná data? Tato akce může být
          nevratná.
        </p>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="modal-password"
            className="block text-sm font-medium text-primary mb-2"
          >
            Zadejte heslo pro potvrzení
          </label>
          <input
            type="password"
            id="modal-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded border border-zinc-300 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/30 text-sm text-primary"
            placeholder="••••••••"
            autoFocus
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 px-4 rounded border border-zinc-300 bg-white text-primary font-medium hover:bg-zinc-50 transition-colors"
          >
            Zrušit
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 px-4 rounded bg-secondary text-primary font-medium hover:bg-tertiary transition-colors"
          >
            Potvrdit
          </button>
        </div>
      </div>
    </div>
  );
}
