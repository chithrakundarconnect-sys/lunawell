"use client";

import { use, useState } from "react";
import { Droplet, Plus, Minus } from "lucide-react";
import { useTranslation } from "@/lib/i18n/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TOTAL_GLASSES = 8;

export default function WaterIntakePage({ params }: { params: { lng: string } }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, 'common');
  const [glasses, setGlasses] = useState(4);

  const percentage = (glasses / TOTAL_GLASSES) * 100;

  const addGlass = () => {
    setGlasses((g) => Math.min(TOTAL_GLASSES, g + 1));
  };

  const removeGlass = () => {
    setGlasses((g) => Math.max(0, g - 1));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('page_title_water')}</h1>
        <p className="text-muted-foreground">
          {t('page_subtitle_water')}
        </p>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Today's Progress</CardTitle>
          <CardDescription className="text-lg">
            {glasses} / {TOTAL_GLASSES} glasses
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8 p-4 sm:p-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {[...Array(TOTAL_GLASSES)].map((_, i) => (
              <Droplet
                key={i}
                className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-all duration-300 ease-in-out ${
                  i < glasses
                    ? "text-blue-400 fill-blue-300"
                    : "text-muted/50"
                }`}
              />
            ))}
          </div>
          <div className="w-full space-y-4">
            <Progress value={percentage} className="h-4" aria-label={`${percentage}% water intake`}/>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs mx-auto">
              <Button
                variant="outline"
                size="icon"
                onClick={removeGlass}
                disabled={glasses === 0}
                aria-label="Remove one glass of water"
                className="w-full sm:w-auto"
              >
                <Minus className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                onClick={addGlass}
                disabled={glasses === TOTAL_GLASSES}
                aria-label="Add one glass of water"
                className="w-full sm:w-auto"
              >
                <Plus className="w-5 h-5 mr-2" /> {t('add_glass')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
