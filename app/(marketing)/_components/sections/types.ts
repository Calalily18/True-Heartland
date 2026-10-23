import type { HOME_PAGE_QUERY_RESULT } from "@/sanity/types";

export type Sections = NonNullable<NonNullable<HOME_PAGE_QUERY_RESULT>["sections"]>;
export type SectionType = Sections[number]["_type"];
export type Section<T extends SectionType> = Extract<Sections[number], { _type: T }>;
