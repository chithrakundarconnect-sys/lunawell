"use client"

import { use, useState } from "react"
import { Check, Sun, Moon, Plus } from "lucide-react"

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

const initialMorningRoutine: SkincareItem[] = [
  { id: "m1", name: "Cleanse", completed: true },
  { id: "m2", name: "Toner", completed: true },
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

function SkincareRoutineList({ items, onToggle }: { items: SkincareItem[], onToggle: (id: string) => void }) {
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
        </div>
      ))}
    </div>
  )
}

function AddProductDialog({ onAddProduct, children }: { onAddProduct: (name: string) => void; children: React.ReactNode }) {
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
          <DialogTitle>Add Custom Product</DialogTitle>
          <DialogDescription>
            Enter the name of the product you want to add to your routine.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="product-name" className="text-left sm:text-right">
              Name
            </Label>
            <Input
              id="product-name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., Hyaluronic Acid"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAdd}>Add to Routine</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function SkincarePage({ params }: { params: { lng: string } }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, 'common');
  const [morningRoutine, setMorningRoutine] = useState(initialMorningRoutine)
  const [eveningRoutine, setEveningRoutine] = useState(initialEveningRoutine)

  const toggleItem = (list: 'morning' | 'evening') => (id: string) => {
    const routineMap = {
      morning: { items: morningRoutine, setter: setMorningRoutine },
      evening: { items: eveningRoutine, setter: setEveningRoutine },
    }
    const { items, setter } = routineMap[list]
    setter(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }
  
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('page_title_skincare')}</h1>
        <p className="text-muted-foreground">
          {t('page_subtitle_skincare')}
        </p>
      </div>

      <Tabs defaultValue="morning" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="morning">
            <Sun className="mr-2 h-4 w-4" />
            Morning
          </TabsTrigger>
          <TabsTrigger value="evening">
            <Moon className="mr-2 h-4 w-4" />
            Evening
          </TabsTrigger>
        </TabsList>
        <TabsContent value="morning">
          <Card>
            <CardHeader>
              <CardTitle>AM Routine</CardTitle>
              <CardDescription>Prepare and protect your skin for the day ahead.</CardDescription>
            </CardHeader>
            <CardContent>
              <SkincareRoutineList items={morningRoutine} onToggle={toggleItem('morning')} />
              <div className="mt-6">
                <AddProductDialog onAddProduct={addProductToMorningRoutine}>
                    <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Custom Product
                    </Button>
                </AddProductDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="evening">
          <Card>
            <CardHeader>
              <CardTitle>PM Routine</CardTitle>
              <CardDescription>Repair and rejuvenate your skin while you sleep.</CardDescription>
            </CardHeader>
            <CardContent>
              <SkincareRoutineList items={eveningRoutine} onToggle={toggleItem('evening')} />
              <div className="mt-6">
                <AddProductDialog onAddProduct={addProductToEveningRoutine}>
                    <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Custom Product
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
