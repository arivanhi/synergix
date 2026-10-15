"use client";
import { createContext, useContext } from "react";
import { defaultContent, type SiteContent } from "./content-model";

const ContentContext = createContext<SiteContent>(defaultContent);
export function ContentProvider({ content, children }: { content: SiteContent; children: React.ReactNode }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
export function useSiteContent() { return useContext(ContentContext); }
