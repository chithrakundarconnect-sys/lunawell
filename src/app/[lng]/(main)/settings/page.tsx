'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Palette, BellRing } from 'lucide-react';

import { useTranslation } from '@/lib/i18n/client';
import { LanguageSelector } from '@/components/language-selector';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import { useAuth } from '@/context/AuthContext';

export default function SettingsPage({ params }: { params: { lng: string } }) {

  const { lng } = React.use(params as any) as { lng: string };
  const { t } = useTranslation(lng, 'common');
  const { user } = useAuth();

  const handleLogout = async () => {
  try {
    await signOut(auth);

    localStorage.clear();   // ⭐ clears saved data
    sessionStorage.clear(); // ⭐ extra safety

    window.location.href = `/${lng}/login`;

  } catch (error) {
    console.log("Logout error", error);
  }
};

  const [theme, setTheme] = useState('light');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
  setIsClient(true);

  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

}, []);

  // ⭐ USER DATA
  const userName =
    user?.displayName ||
    user?.email?.split('@')[0] ||
    'User';

  const userEmail = user?.email || 'No email';

  return (
    <div className="space-y-8">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('settings_title')}</h1>
        <p className="text-muted-foreground">{t('settings_subtitle')}</p>
      </div>

      {/* PROFILE CARD */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-bold">
                {userName.slice(0,2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <CardTitle>{userName}</CardTitle>
              <CardDescription>{userEmail}</CardDescription>
            </div>

          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
           {t("settings_profile_description")}
          </p>
        </CardContent>
      </Card>

      {/* PREFERENCES */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BellRing className="size-5 text-primary" />
            <span>{t("preferences")}</span>
          </h2>
          <p className="text-muted-foreground text-sm">
           {t("preferences_description")}
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">

            <div className="flex items-center justify-between">
              <Label>{t("water_reminders")}</Label>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <Label>{t("skincare_reminders")}</Label>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <Label>{t("wellness_notifications")}</Label>
              <Switch />
            </div>

          </CardContent>
        </Card>
      </div>

      {/* THEME */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Palette className="size-5 text-primary" />
            <span>{t('theme_and_accessibility')}</span>
          </h2>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">

            <RadioGroup
  value={theme}
  onValueChange={(value) => {
    setTheme(value)
    localStorage.setItem("theme", value)

    if (value === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }}
  className="space-y-4"
>

              <div className="flex items-center justify-between">
                <Label>{t('light_theme')}</Label>
                <RadioGroupItem value="light" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Label>{t('dark_theme')}</Label>
<RadioGroupItem value="dark" />
              </div>

            </RadioGroup>

            <Separator />

            <LanguageSelector lng={lng} />

          </CardContent>
        </Card>
      </div>

      {/* ACCOUNT ACTIONS */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{t("account_actions")}</h2>
        </div>

        <Card>
          <CardContent className="pt-6 flex flex-col sm:flex-row gap-4">

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">{t('edit_profile')}</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('edit_profile')}</DialogTitle>
                  <DialogDescription>
                    {t('edit_profile_description')}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">

                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                    <Label>{t("name")}</Label>
                    <Input defaultValue={userName} className="col-span-3" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                    <Label>{t("email")}</Label>
                    <Input defaultValue={userEmail} className="col-span-3" readOnly />
                  </div>

                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">{t('cancel')}</Button>
                  </DialogClose>
                  <Button>{t('save_changes')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

           <Button variant="destructive" onClick={handleLogout}>
          {t('logout')}
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}