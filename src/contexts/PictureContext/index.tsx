/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';

const PictureContext = React.createContext<{
  picture: string | null;
  setPicture: React.Dispatch<React.SetStateAction<string | null>>;
  pictureLoading: boolean;
  setPictureLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  picture: null,
  setPicture: () => null,
  pictureLoading: false,
  setPictureLoading: () => null,
});

type Props = {
  children: React.ReactElement;
};

const PictureProvider = ({ children }: Props): React.ReactElement => {
  const [picture, setPicture] = useState<string | null>(null);
  const [pictureLoading, setPictureLoading] = useState<boolean>(true);

  useEffect(() => {
    if (picture) setPictureLoading(false);
  }, [picture]);

  return (
    <PictureContext.Provider
      value={{ picture, setPicture, pictureLoading, setPictureLoading }}
    >
      {children}
    </PictureContext.Provider>
  );
};

export { PictureProvider, PictureContext };
