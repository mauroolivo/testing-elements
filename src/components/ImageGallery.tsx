import React from 'react';
import Image from 'next/image';
import logo from './assets/logo.png';

type Props = {
  title?: string;
};

export default function ImageGallery({ title = 'Gallery' }: Props) {
  type ImportedImage = string | { src?: string; default?: string };
  const imported = logo as ImportedImage;
  const srcString: string =
    typeof imported === 'string'
      ? imported
      : (imported.src ?? imported.default ?? String(imported));

  return (
    <div>
      <h3>{title}</h3>
      <Image src={srcString} alt="logo" width={64} height={64} />
    </div>
  );
}
