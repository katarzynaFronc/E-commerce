"use client";

import { useState } from "react";
import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";

import { SanityProduct } from "../../config/inventory";

interface Props {
  product: SanityProduct;
}

export function ProductGallery({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="d-flex flex-column">
      <div className="">
        <Image src={urlForImage(product.images[selectedImage]).url()} alt={`Main ${product.name} image`} width={300} height={400} className="h-full w-full border-2 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 sm:rounded-lg" />
      </div>

      <div className="mt-4">
        <ul className="d-flex flex-row p-0">
          {product.images.map((image, index) => (
            <div key={image._key as string} onClick={() => setSelectedImage(index)} className="">
              <span className="">
                <Image src={urlForImage(image).url()} width={100} height={100} alt="" className="" />
              </span>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
