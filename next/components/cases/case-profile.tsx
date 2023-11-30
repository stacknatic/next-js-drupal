// icon imports
import YoutubeIcon from "@/styles/icons/youtube.svg";
import FacebookIcon from "@/styles/icons/facebook.svg";
import LinkedInIcon from "@/styles/icons/linkedin.svg";
import TwitterIcon from "@/styles/icons/twitter.svg";
import InstagramIcon from "@/styles/icons/instagram.svg";

function CaseProfile({ profiles }) {
  return (
    <>
      {profiles.map((profile) => (
        <li key={profile.id} className="grid gap-2 mb-4">
          <p className="text-heading-sm">
            {profile.type === "paragraph--client_detail"
              ? profile.field_clients
              : profile.field_projects}
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
                <a href={profile.field_linkedin.full_url}>
                  <LinkedInIcon className="h-6 w-6 text-primary-400" />
                </a>
              </li>
            )}
            {profile.field_instagram?.full_url && (
              <li>
                <a href={profile.field_instagram.full_url}>
                  <InstagramIcon className="h-6 w-6 text-primary-400" />
                </a>
              </li>
            )}
            {profile.field_facebook?.full_url && (
              <li>
                <a href={profile.field_facebook.full_url}>
                  <FacebookIcon className="h-6 w-6 text-primary-400" />
                </a>
              </li>
            )}
            {profile.field_twitter?.full_url && (
              <li>
                <a href={profile.field_twitter.full_url}>
                  <TwitterIcon className="h-6 w-6 text-primary-400" />
                </a>
              </li>
            )}
            {profile.field_youtube?.full_url && (
              <li>
                <a href={profile.field_youtube.full_url}>
                  <YoutubeIcon className="h-6 w-6 text-primary-400" />
                </a>
              </li>
            )}
          </ul>
        </li>
      ))}
    </>
  );
}

export default CaseProfile;
