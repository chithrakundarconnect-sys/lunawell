'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { KikiAvatar, Avatar1, Avatar2, Avatar3 } from './icons';
import { User, Upload } from 'lucide-react';

type PredefinedAvatar = {
    id: string;
    component: React.ReactElement;
    label: string;
};

const predefinedAvatars: PredefinedAvatar[] = [
  { id: 'kiki', component: <KikiAvatar />, label: 'Kiki' },
  { id: 'avatar1', component: <Avatar1 />, label: 'Avatar 1' },
  { id: 'avatar2', component: <Avatar2 />, label: 'Avatar 2' },
  { id: 'avatar3', component: <Avatar3 />, label: 'Avatar 3' },
];

export function AvatarMenu() {
  const [selectedId, setSelectedId] = React.useState('kiki');
  const [uploadedSrc, setUploadedSrc] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newSrc = URL.createObjectURL(file);
      
      if (uploadedSrc) {
        URL.revokeObjectURL(uploadedSrc);
      }

      setUploadedSrc(newSrc);
      setSelectedId('uploaded');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSelectAvatar = (id: string) => {
    setSelectedId(id);
    if (id !== 'uploaded' && uploadedSrc) {
      URL.revokeObjectURL(uploadedSrc);
      setUploadedSrc(null);
    }
  };

  React.useEffect(() => {
    return () => {
      if (uploadedSrc) {
        URL.revokeObjectURL(uploadedSrc);
      }
    };
  }, [uploadedSrc]);

  const selectedAvatar = predefinedAvatars.find(a => a.id === selectedId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full">
          <Avatar className="h-9 w-9 border-2 border-primary/50">
            {selectedId === 'uploaded' && uploadedSrc ? (
              <>
                <AvatarImage src={uploadedSrc} alt="Uploaded Avatar" />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </>
            ) : (
              selectedAvatar?.component ?? (
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              )
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Choose Your Avatar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {predefinedAvatars.map((avatar) => (
          <DropdownMenuItem key={avatar.id} onClick={() => handleSelectAvatar(avatar.id)}>
            <Avatar className="h-8 w-8 mr-2">
                {avatar.component}
            </Avatar>
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
