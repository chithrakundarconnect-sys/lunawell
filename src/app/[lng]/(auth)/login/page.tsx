'use client';

import { use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/icons';
import { useTranslation } from '@/lib/i18n/client';

export default function LoginPage({ params }: { params: { lng: string } }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, 'common');
  return (
    <div className="w-full max-w-sm">
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2">
          <Logo className="text-primary h-8 w-8" />
          <h1 className="text-2xl font-semibold font-headline">LunaWell</h1>
        </div>
      </div>
      <Card className="w-full">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">{t('login_welcome')}</CardTitle>
          <CardDescription>{t('login_prompt')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="jane@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full">
            {t('login')}
          </Button>
          <p className="text-center text-sm text-muted-foreground pt-2">
            {t('login_no_account')}{' '}
            <Link href={`/${lng}/signup`} className="font-medium text-primary hover:underline">
              {t('signup')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
