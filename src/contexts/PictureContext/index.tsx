/* eslint-disable no-useless-escape */
import React, { useState } from 'react';

const PictureContext = React.createContext<{
  picture: string | null;
  setPicture: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  picture: null,
  setPicture: () => null,
});

type Props = {
  children: React.ReactElement;
};

const PictureProvider = ({ children }: Props): React.ReactElement => {
  const [picture, setPicture] = useState<string | null>(null);

  return (
    <PictureContext.Provider value={{ picture, setPicture }}>
      {children}
    </PictureContext.Provider>
  );
};

export { PictureProvider, PictureContext };
