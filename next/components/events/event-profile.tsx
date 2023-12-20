import { useTranslation } from "react-i18next";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";




function EventProfile({ profiles }) {
  const { t } = useTranslation();
  return (
    <>
      {profiles.map((profile) => (
        <li key={profile.id} className="grid gap-2 mb-4">
          <p className="text-heading-sm">
            {profile.type === "paragraph--organizer_detail"
              ? profile.field_organizer_name
              : profile.field_speaker}
          </p>
          {profile.field_website && (
            <ul className="flex flex-wrap grap-2">
              {profile.field_website.map((item, index) => (
                <li
                  key={item.title + index}
                  className="font-bold p-1 rounded-md text-primary-400"
                >
                  <a href={item.full_url}>{item.title}</a>
                </li>
              ))}
            </ul>
          )}
          <ul className="flex flex-wrap gap-2">
            {profile.field_linkedin?.full_url && (
              <li>
                <a href={profile.field_linkedin.full_url} aria-label="Linkedin">
                <FaLinkedin className="h-6 w-6 text-primary-400"/>
                </a>
              </li>
            )}
            {profile.field_instagram?.full_url && (
              <li>
                <a href={profile.field_instagram.full_url} aria-label="Instagram">
                <FaInstagram className="h-6 w-6 text-primary-400"/>
                </a>
              </li>
            )}
            {profile.field_facebook?.full_url && (
              <li>
                <a href={profile.field_facebook.full_url} aria-label="Facebook">
                <FaFacebook className="h-6 w-6 text-primary-400"/>
                </a>
              </li>
            )}
            {profile.field_twitter?.full_url && (
              <li>
                <a href={profile.field_twitter.full_url} aria-label="Twitter">
                <FaXTwitter className="h-6 w-6 text-primary-400"/>
                </a>
              </li>
            )}
            {profile.field_youtube?.full_url && (
              <li>
                <a href={profile.field_youtube.full_url} aria-label="Youtube">
                <FaYoutube className="h-6 w-6 text-primary-400"/>
                </a>
              </li>
            )}
          </ul>
        </li>
      ))}
    </>
  );
}

export default EventProfile;
