import { useTranslation } from "next-i18next";
import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";




export function SocialShare() {
  const [pageUrl, setPageUrl] = useState<string>("");
  const { t } = useTranslation();

  const data = [
    {
      id: 1,
      location: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      icon: <FaFacebook className="block h-6 w-6 text-white" />,
    },
    {
      id: 2,
      location: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${pageUrl}`,
      icon: <FaXTwitter className="block h-6 w-6 text-white" />,
    },
    {
      id: 3,
      location: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`,
      icon: <FaLinkedin className="block h-6 w-6 text-white" />,
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* <p className="text-center">{t("share-page")}</p> */}
          <ul className="flex flex-wrap justify-center">
            {data?.map(({ id, url, icon, location }) => (
              <li className="m-4" key={id}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {icon}
                  {location && (
                    <span className="sr-only">
                      {t("share-to", { location })}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
      </div>
    </>
  );
}