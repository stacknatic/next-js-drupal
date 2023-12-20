import { absoluteUrl } from "@/lib/drupal/absolute-url";
import Image from "next/image";
import Link from "next/link";

function CaseProfile({ profiles }) {
  return (
    <>
      {profiles.map((profile) => (
        <li key={profile.id} className="grid gap-2 mb-4">
          <p className="text-heading-sm">
            {profile.type === "paragraph--logolink" && (
              <Link href={profile.field_link.full_url}>
                <Image
                  src={absoluteUrl(profile.field_logo.uri.url)}
                  width={100}
                  height={100}
                  alt={profile.field_logo.resourceIdObjMeta.alt}
                  className="object-cover rounded-md"
                />
              </Link>
            )}
          </p>
        </li>
      ))}
    </>
  );
}

export default CaseProfile;
