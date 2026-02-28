'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Palette, BellRing } from 'lucide-react';

import { useTranslation } from '@/lib/i18n/client';
import { LanguageSelector } from '@/components/language-selector';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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

  const [theme, setTheme] = useState('light');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
            Manage your personal wellness preferences and account details.
          </p>
        </CardContent>
      </Card>

      {/* PREFERENCES */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BellRing className="size-5 text-primary" />
            <span>Preferences</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Control how you receive notifications and reminders.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">

            <div className="flex items-center justify-between">
              <Label>Water Reminders</Label>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <Label>Skincare Reminders</Label>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <Label>Wellness Notifications</Label>
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

            <RadioGroup value={theme} onValueChange={setTheme} className="space-y-4">

              <div className="flex items-center justify-between">
                <Label>{t('light_theme')}</Label>
                <RadioGroupItem value="light" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Label>{t('pastel_theme')}</Label>
                <RadioGroupItem value="pastel" />
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
          <h2 className="text-xl font-semibold">Account Actions</h2>
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
                    <Label>Name</Label>
                    <Input defaultValue={userName} className="col-span-3" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                    <Label>Email</Label>
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

            <Button variant="destructive" asChild>
              <Link href={`/${lng}/login`}>{t('logout')}</Link>
            </Button>

          </CardContent>
        </Card>
      </div>

    </div>
  );
}