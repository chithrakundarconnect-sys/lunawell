'use client'

import { useTranslation } from '@/lib/i18n/client'
import { languages } from '@/lib/i18n/settings'
import { usePathname, useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Globe } from 'lucide-react'

const langMap: { [key: string]: string } = {
  en: 'english',
  hi: 'hindi',
  kn: 'kannada',
}

export const LanguageSelector = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, 'common')
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLng: string) => {
    const newPath = pathname.replace(`/${lng}`, `/${newLng}`)
    router.push(newPath)
    router.refresh()
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full">
      <Label htmlFor="language-select" className="font-medium flex items-center gap-2">
        <Globe className="size-5 text-primary" />
        {t('language')}
      </Label>
      <Select value={lng} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-full sm:w-[180px]" id="language-select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {t(langMap[lang])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
