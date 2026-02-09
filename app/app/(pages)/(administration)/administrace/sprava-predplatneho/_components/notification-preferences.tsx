"use client";

import { useState, useEffect } from "react";
import { Mail, MessageSquare, Bell } from "lucide-react";
import Button from "@/app/_components/atoms/Button";
import { updateRecord } from "@/app/_functions/backend";
import { NotificationSettings } from "./subscription-management";

interface NotificationPreferencesProps {
  subscribeId: string;
  onPreferencesChange?: (preferences: NotificationSettings) => void;
  emailPreference: boolean;
  smsPreference: boolean;
  mobileNotifications: boolean;
  browserNotifications: boolean;
}

export default function NotificationPreferences({
  subscribeId,
  onPreferencesChange,
  emailPreference,
  smsPreference,
  mobileNotifications,
  browserNotifications,
}: NotificationPreferencesProps) {
  const [originalPreferences, setOriginalPreferences] =
    useState<NotificationSettings>({
      emailNotifications: emailPreference,
      smsNotifications: smsPreference,
      mobileNotifications: mobileNotifications,
      browserNotifications: browserNotifications,
    });
  const [preferences, setPreferences] = useState<NotificationSettings>({
    emailNotifications: emailPreference,
    smsNotifications: smsPreference,
    mobileNotifications: mobileNotifications,
    browserNotifications: browserNotifications,
  });
  const [isSaving, setIsSaving] = useState(false);

  const isModified =
    JSON.stringify(preferences) !== JSON.stringify(originalPreferences);

  const handleToggle = (key: keyof NotificationSettings, newValue: boolean) => {
    setPreferences({
      ...preferences,
      [key]: newValue,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const response = await updateRecord({
        collectionSlug: "subscribes",
        recordId: subscribeId,
        body: {
          notificationSettings: {
            emailNotifications: preferences.emailNotifications,
            smsNotifications: preferences.smsNotifications,
            mobileNotifications: preferences.mobileNotifications,
            browserNotifications: preferences.browserNotifications,
          },
        },
      });

      if (!response.id) {
        throw new Error("Nepodařilo se uložit preference");
      }

      setOriginalPreferences(preferences);
      onPreferencesChange?.(preferences);
    } catch (error) {
      alert("Chyba při ukládání preferencí. Zkuste znovu.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setPreferences(originalPreferences);
  };

  return (
    <div className="space-y-6">
      <div>
        <h5 className="text-primary mb-1">Nastavení notifikací předplatného</h5>
        <p className="text-sm text-zinc-600">
          Zvolte, jaké typy notifikací chcete dostávat
        </p>
      </div>

      {/* Email Notifications */}
      <NotificationSwitch
        icon={Mail}
        label="Emailové notifikace"
        description="Dostávejte důležitá upozornění na váš email"
        checked={preferences.emailNotifications}
        onChange={(value) => handleToggle("emailNotifications", value)}
        disabled={isSaving}
      />

      {/* SMS Notifications */}
      <NotificationSwitch
        icon={MessageSquare}
        label="SMS notifikace"
        description="Dostávejte rychlá upozornění přes SMS"
        checked={preferences.smsNotifications}
        onChange={(value) => handleToggle("smsNotifications", value)}
        disabled={isSaving}
      />

      {/* Browser Notifications */}
      <NotificationSwitch
        icon={Bell}
        label="Browser notifikace"
        description="Dostávejte pop-up upozornění v prohlížeči"
        checked={preferences.browserNotifications}
        onChange={(value) => handleToggle("browserNotifications", value)}
        disabled={isSaving}
      />

      {/* Mobile Notifications */}
      <NotificationSwitch
        icon={Bell}
        label="Mobilní notifikace"
        description="Dostávejte pop-up upozornění na telefonu"
        checked={preferences.mobileNotifications}
        onChange={(value) => handleToggle("mobileNotifications", value)}
        disabled={isSaving}
      />

      {/* Action Buttons */}
      {isModified && (
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
          <Button
            text={isSaving ? "Ukládám..." : "Uložit"}
            onClick={handleSave}
            disabled={isSaving}
          />
          <Button
            text="Zrušit"
            onClick={handleCancel}
            variant="plain"
            disabled={isSaving}
          />
        </div>
      )}
    </div>
  );
}

interface NotificationSwitchProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

function NotificationSwitch({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
  disabled,
}: NotificationSwitchProps) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg border border-zinc-100 hover:border-zinc-200 transition-colors"
    >
      <div className="flex items-start gap-3 flex-1">
        {checked ? (
          <div className="shrink-0 w-12 h-12 bg-emerald-600/10 rounded-lg flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-5 h-5 " />
          </div>
        ) : (
          <div className="shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-5 h-5 text-secondary" />
          </div>
        )}

        <div className="flex-1">
          <p className="font-medium text-zinc-900">{label}</p>
          <p className="text-sm text-zinc-600 mt-0.5">{description}</p>
        </div>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange(!checked);
        }}
        disabled={disabled}
        className={`ml-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-secondary" : "bg-zinc-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        aria-label={`${label} ${checked ? "zapnuto" : "vypnuto"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
