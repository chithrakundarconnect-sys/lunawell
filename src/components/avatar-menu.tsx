'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { KikiUserAvatar, Avatar1, Avatar2, Avatar3 } from './icons';
import { Upload } from 'lucide-react';

type PredefinedAvatar = {
  id: string;
  component: React.ReactElement;
  label: string;
};

const predefinedAvatars: PredefinedAvatar[] = [
  { id: 'kiki', component: <KikiUserAvatar />, label: 'Kiki' },
  { id: 'avatar1', component: <Avatar1 />, label: 'Avatar 1' },
  { id: 'avatar2', component: <Avatar2 />, label: 'Avatar 2' },
  { id: 'avatar3', component: <Avatar3 />, label: 'Avatar 3' },
];

export function AvatarMenu() {
  const [selectedId, setSelectedId] = React.useState('kiki');
  const [uploadedSrc, setUploadedSrc] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  /* ---------- LOAD SAVED AVATAR AFTER REFRESH ---------- */
  React.useEffect(() => {
    const saved = localStorage.getItem("user-avatar");
    if (saved) {
      setUploadedSrc(saved);
      setSelectedId("uploaded");
    }
  }, []);

  /* ---------- HANDLE IMAGE UPLOAD ---------- */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      setUploadedSrc(base64);
      setSelectedId("uploaded");

      localStorage.setItem("user-avatar", base64);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSelectAvatar = (id: string) => {
    setSelectedId(id);

    if (id !== 'uploaded') {
      setUploadedSrc(null);
      localStorage.removeItem("user-avatar");
    }
  };

  const selectedAvatar = predefinedAvatars.find(a => a.id === selectedId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full">
          <div className="h-9 w-9 rounded-full border-2 border-primary/50 overflow-hidden flex items-center justify-center bg-primary/10">

            {selectedId === 'uploaded' && uploadedSrc ? (
              <img
                src={uploadedSrc}
                alt="Uploaded Avatar"
                className="h-full w-full object-cover"
              />
            ) : selectedAvatar ? (
              <div className="h-full w-full flex items-center justify-center">
                {selectedAvatar.component}
              </div>
            ) : null}

          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="bottom" sideOffset={8} className="w-56 z-50">
        <DropdownMenuLabel>Choose Your Avatar</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {predefinedAvatars.map((avatar) => (
          <DropdownMenuItem key={avatar.id} onClick={() => handleSelectAvatar(avatar.id)}>
            <div className="h-8 w-8 mr-2 rounded-full overflow-hidden flex items-center justify-center bg-primary/10">
              {avatar.component}
            </div>
            <span>{avatar.label}</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleUploadClick}>
          <Upload className="mr-2 h-4 w-4" />
          <span>Upload Image</span>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}