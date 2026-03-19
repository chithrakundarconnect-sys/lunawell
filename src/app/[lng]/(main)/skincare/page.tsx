"use client"

import * as React from 'react';
import { useState } from "react"
import { Check, Sun, Moon, Plus, Trash2 } from "lucide-react"

import type { SkincareItem } from "@/lib/types"
import { useTranslation } from "@/lib/i18n/client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';

const initialMorningRoutine: SkincareItem[] = [
  { id: "m1", name: "Cleanse", completed: false },
  { id: "m2", name: "Toner", completed: false },
  { id: "m3", name: "Vitamin C Serum", completed: false },
  { id: "m4", name: "Moisturizer", completed: false },
  { id: "m5", name: "SPF 50+", completed: false },
]

const initialEveningRoutine: SkincareItem[] = [
  { id: "e1", name: "Double Cleanse", completed: false },
  { id: "e2", name: "Exfoliate (2-3x a week)", completed: false },
  { id: "e3", name: "Retinol Serum", completed: false },
  { id: "e4", name: "Eye Cream", completed: false },
  { id: "e5", name: "Night Cream", completed: false },
]

function SkincareRoutineList({
  items,
  onToggle,
  onDelete
}: {
  items: SkincareItem[],
  onToggle: (id: string) => void,
  onDelete: (id: string) => void
}){
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          onClick={() => onToggle(item.id)}
          className={cn(
            "flex items-center gap-4 rounded-lg border p-4 transition-all cursor-pointer",
            item.completed ? "bg-secondary border-primary/20" : "bg-card hover:bg-accent"
          )}
        >
          <div className={cn(
            "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2",
            item.completed ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
          )}>
            {item.completed ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{index + 1}</span>}
          </div>
          <span className={cn("flex-1 font-medium", item.completed && "text-muted-foreground line-through")}>
  {item.name}
</span>

<Trash2
  onClick={(e) => {
    e.stopPropagation();
    onDelete(item.id);
  }}
  className="h-4 w-4 text-red-500 cursor-pointer hover:scale-110"
/>

        </div>
      ))}
    </div>
  )
}

function AddProductDialog({
  onAddProduct,
  children,
  t
}: {
  onAddProduct: (name: string) => void;
  children: React.ReactNode;
  t: any;
}) {

  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState('');

  const handleAdd = () => {
    if (productName.trim()) {
      onAddProduct(productName.trim());
      setProductName('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("add_custom_product")}</DialogTitle>
          <DialogDescription>
            {t("add_product_desc")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="product-name" className="text-left sm:text-right">
              {t("name")}
            </Label>
            <Input
              id="product-name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder={t("product_example")}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">{t("cancel")}</Button>
          </DialogClose>
          <Button onClick={handleAdd}>{t("add_to_routine")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function SkincarePage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = React.use(params);
  const { t } = useTranslation(lng, 'common');

const { user } = useAuth();
const todayDate = new Date().toLocaleDateString('en-CA');
const [docId, setDocId] = React.useState<string | null>(null);

  const [morningRoutine, setMorningRoutine] = useState(initialMorningRoutine)
  const [eveningRoutine, setEveningRoutine] = useState(initialEveningRoutine)
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<'morning' | 'evening'>('morning');
  React.useEffect(() => {
  if (!user) return;

  const loadSkincare = async () => {
    const q = query(
      collection(db, "dailyHealth"),
      where("userId", "==", user.uid),
      where("date", "==", todayDate)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const d = snapshot.docs[0];
      const data = d.data();

      if (data.skincareMorning) setMorningRoutine(data.skincareMorning);
      if (data.skincareEvening) setEveningRoutine(data.skincareEvening);

      setDocId(d.id);
      setLoading(false);
    } else {
      const newDoc = await addDoc(collection(db, "dailyHealth"), {
        userId: user.uid,
        date: todayDate,
        skincareMorning: initialMorningRoutine,
        skincareEvening: initialEveningRoutine,
        createdAt: serverTimestamp(),
      });

      setDocId(newDoc.id);
      setLoading(false);
    }
  };

  loadSkincare();
}, [user]);
React.useEffect(() => {
  const hour = new Date().getHours();

  if (hour >= 18) {
    setActiveTab('evening');
  } else {
    setActiveTab('morning');
  }
}, []);

 const toggleItem = (list: 'morning' | 'evening') => async (id: string) => {
  if (!user || !docId) return;

  const routineMap = {
    morning: { items: morningRoutine, setter: setMorningRoutine, field: "skincareMorning" },
    evening: { items: eveningRoutine, setter: setEveningRoutine, field: "skincareEvening" },
  };

  const { items, setter, field } = routineMap[list];

  const updated = items.map((item) =>
    item.id === id ? { ...item, completed: !item.completed } : item
  );

  // update UI instantly
  setter(updated);

  // update Firestore
  const docRef = doc(db, "dailyHealth", docId);

  await updateDoc(docRef, {
    [field]: updated,
    updatedAt: serverTimestamp(),
  });
};
const deleteItem = (list: 'morning' | 'evening') => async (id: string) => {
  if (!docId) return;

  const routineMap = {
    morning: { items: morningRoutine, setter: setMorningRoutine, field: "skincareMorning" },
    evening: { items: eveningRoutine, setter: setEveningRoutine, field: "skincareEvening" },
  };

  const { items, setter, field } = routineMap[list];

  const updated = items.filter((item) => item.id !== id);

  setter(updated);

  const docRef = doc(db, "dailyHealth", docId);

  await updateDoc(docRef, {
    [field]: updated,
    updatedAt: serverTimestamp(),
  });
};
  
  const addProductToMorningRoutine = (name: string) => {
    const newItem: SkincareItem = {
        id: `m-${Date.now()}`,
        name,
        completed: false,
    };
    setMorningRoutine(prev => [...prev, newItem]);
  };

  const addProductToEveningRoutine = (name: string) => {
      const newItem: SkincareItem = {
          id: `e-${Date.now()}`,
          name,
          completed: false,
      };
      setEveningRoutine(prev => [...prev, newItem]);
  };
  /* ⭐⭐⭐ THE IMPORTANT FIX ⭐⭐⭐ */
if (loading) {
return (
<div className="p-10 text-center text-lg">
{t("loading_skincare")}
</div>
);
}

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('page_title_skincare')}</h1>
        <p className="text-muted-foreground">
          {t('page_subtitle_skincare')}
        </p>
      </div>

      <Tabs
  value={activeTab}
  onValueChange={(v) => setActiveTab(v as 'morning' | 'evening')}
  className="w-full"
>
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="morning">
            <Sun className="mr-2 h-4 w-4" />
           {t("morning")}
          </TabsTrigger>
          <TabsTrigger value="evening">
            <Moon className="mr-2 h-4 w-4" />
            {t("evening")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="morning">
          <Card>
            <CardHeader>
              <CardTitle>{t("am_routine")}</CardTitle>
              <CardDescription>{t("am_routine_desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <SkincareRoutineList
  items={morningRoutine}
  onToggle={toggleItem('morning')}
  onDelete={deleteItem('morning')}
/>
              <div className="mt-6">
               <AddProductDialog onAddProduct={addProductToMorningRoutine} t={t}>
                    <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        {t("add_custom_product")}
                    </Button>
                </AddProductDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="evening">
          <Card>
            <CardHeader>
              <CardTitle>{t("pm_routine")}</CardTitle>
              <CardDescription>{t("pm_routine_desc")}</CardDescription>
            </CardHeader>
            <CardContent>
             <SkincareRoutineList
  items={eveningRoutine}
  onToggle={toggleItem('evening')}
  onDelete={deleteItem('evening')}
/>
              <div className="mt-6">
               <AddProductDialog onAddProduct={addProductToEveningRoutine} t={t}>
                    <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                       {t("add_custom_product")}
                    </Button>
                </AddProductDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}