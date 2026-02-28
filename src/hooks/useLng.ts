'use client';

import { useParams } from 'next/navigation';

export default function useLng() {
  const params = useParams();

  return (params?.lng as string) || "en";
}