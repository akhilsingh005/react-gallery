import { useState, createContext } from "react";

export const GalleryContext = createContext(null);

export const ContextProvider = ({ children }: any) => {
  const [pageNo, setPageNo] = useState(1);
  const contextData: any = { pageNo, setPageNo };
  return (
    <GalleryContext.Provider value={contextData}>
      {children}
    </GalleryContext.Provider>
  );
};
