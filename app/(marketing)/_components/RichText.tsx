import { PortableText, type PortableTextComponents } from "next-sanity";
import type { BlockContent } from "@/sanity/types";

const components: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a href={href} {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}>
          {children}
        </a>
      );
    },
  },
};

// Rich text without the article spacing, for paragraphs inside designed sections.
export function Blocks({ value, className }: { value: BlockContent | null | undefined; className?: string }) {
  if (!value?.length) return null;
  const body = <PortableText value={value} components={components} />;
  return className ? <div className={className}>{body}</div> : body;
}

export function RichText({ value }: { value: BlockContent | null | undefined }) {
  if (!value?.length) return null;
  return (
    <div className="prose">
      <PortableText value={value} components={components} />
    </div>
  );
}
