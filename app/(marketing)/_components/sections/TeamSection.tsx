import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Blocks } from "../RichText";
import { SectionHead, SectionShell } from "./SectionShell";
import type { Section } from "./types";

export function TeamSection(props: Section<"teamSection">) {
  const { kicker, heading, members } = props;
  return (
    <SectionShell anchorId={props.anchorId} background={props.background} fallback="paper2">
      <SectionHead kicker={kicker} heading={heading} />
      {members?.length ? (
        <div className="founders">
          {members.map((m) => {
            const dims = m.personalPhoto?.dimensions;
            const personalWidth = 800;
            const personalHeight = dims?.width && dims.height ? Math.round((personalWidth * dims.height) / dims.width) : 600;
            return (
              <div key={m._id} className="founder">
                {m.photo?.asset && (
                  <div className="founder-photo">
                    <Image
                      src={urlFor(m.photo).width(184).height(184).fit("crop").url()}
                      alt={m.photo.alt}
                      width={92}
                      height={92}
                    />
                  </div>
                )}
                <h3>{m.name}</h3>
                {m.role && <div className="role">{m.role}</div>}
                <Blocks value={m.bio} className="bio" />
                {(m.personalPhoto?.asset || m.personalText) && (
                  <div className="founder-personal">
                    {m.personalPhoto?.asset && (
                      <Image
                        src={urlFor(m.personalPhoto).width(personalWidth).url()}
                        alt={m.personalPhoto.alt}
                        width={personalWidth}
                        height={personalHeight}
                        sizes="(max-width: 720px) 100vw, 500px"
                      />
                    )}
                    {m.personalText && <p>{m.personalText}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </SectionShell>
  );
}
