'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Palette, BellRing } from 'lucide-react';

import { useTranslation } from '@/lib/i18n/client';
import { LanguageSelector } from '@/components/language-selector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

export default function SettingsPage({ params }: { params: { lng: string }}) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, 'common');
  const [theme, setTheme] = useState('light');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('settings_title')}</h1>
        <p className="text-muted-foreground">
          {t('settings_subtitle')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://picsum.photos/seed/user/100/100" />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Jane Doe</CardTitle>
              <CardDescription>jane.doe@example.com</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Manage your personal wellness preferences and account details.
          </p>
        </CardContent>
      </Card>

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
            {isClient && (
              <>
                <div className="flex items-center justify-between">
                  <Label htmlFor="water-reminders" className="font-medium">
                    Water Reminders
                  </Label>
                  <Switch id="water-reminders" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="skincare-reminders" className="font-medium">
                    Skincare Reminders
                  </Label>
                  <Switch id="skincare-reminders" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="wellness-notifications" className="font-medium">
                    Wellness Notifications
                  </Label>
                  <Switch id="wellness-notifications" />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

       <div className="space-y-6">
        <div className="space-y-2">
           <h2 className="text-xl font-semibold flex items-center gap-2">
            <Palette className="size-5 text-primary" />
            <span>{t('theme_and_accessibility')}</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            {t('theme_subtitle')}
          </p>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-6">
            {isClient && (
              <>
                <RadioGroup value={theme} onValueChange={setTheme} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="light-theme">{t('light_theme')}</Label>
                    <RadioGroupItem value="light" id="light-theme" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pastel-theme">{t('pastel_theme')}</Label>
                    <RadioGroupItem value="pastel" id="pastel-theme" />
                  </div>
                </RadioGroup>
                <Separator />
                <LanguageSelector lng={lng} />
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
         <div className="space-y-2">
           <h2 className="text-xl font-semibold">
            Account Actions
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage your account settings.
          </p>
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
                      <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
                        <Label htmlFor="name" className="text-left sm:text-right">
                          {t('name')}
                        </Label>
                        <Input
                          id="name"
                          defaultValue="Jane Doe"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-4">
                        <Label htmlFor="email" className="text-left sm:text-right">
                          {t('email')}
                        </Label>
                        <Input
                          id="email"
                          defaultValue="jane.doe@example.com"
                          className="col-span-3"
                          readOnly
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          {t('cancel')}
                        </Button>
                      </DialogClose>
                      <Button type="submit">{t('save_changes')}</Button>
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
