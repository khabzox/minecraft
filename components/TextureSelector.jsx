import Image from "next/image";
import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStore";
import { useKeyboard } from "@/hooks/useKeyboard";
import { dirtImg, grassImg, glassImg, logImg, woodImg } from "@/utils/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => {
    if (!state) return [null, () => {}]; // Default values if state is undefined
    return [state.texture, state.setTexture];
  });

  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, grass, glass, wood, log]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);
    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    visible && (
      <div className="absolute centered texture-selector">
        {Object.entries(images).map(([k, src]) => (
          <Image
            key={k}
            src={src}
            width={15}
            height={15}
            alt={k}
            className={`${k === activeTexture ? "active" : ""}`}
          />
        ))}
      </div>
    )
  );
};
