import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import { UsersIcon } from "@sanity/icons/Users";
import type { StructureResolver } from "sanity/structure";
import { singletonTypes } from "./schemaTypes";

// Singletons open a fixed document ID, so there is only ever one of each.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home page")
        .icon(HomeIcon)
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("About page")
        .icon(UsersIcon)
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("teamMember").title("Team"),
      S.documentTypeListItem("post").title("Blog posts"),
      S.divider(),
      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id && !singletonTypes.has(id) && !["service", "teamMember", "post"].includes(id);
      }),
    ]);
