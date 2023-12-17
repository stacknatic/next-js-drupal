import NextImage from "next/image";
import { useTranslation } from "next-i18next";
import { absoluteUrl } from '@/lib/drupal/absolute-url';


export function ContactList({ contactPersons }) {
  const { t } = useTranslation();

  return (
    <section className="py-8">
      <h2 className="text-heading-sm font-bold md:text-heading-md tracking-widest text-center text-primary-800 mt-[8rem] mb-[2rem]">
        {t("Contact us")}
      </h2>
      <ul className="grid auto-rows-max grid-cols-1 justify-items-center gap-4 py-4 sm:grid-cols-2 md:grid-cols-3">
        {contactPersons.field_contact_person?.map(({ id, field_contact_image, field_contact_name, field_contact_phone, field_position, field_contact_email
        }) => (
          <li key={id} className="grid justify-items-center p-4">
            <div className="mb-6 flex h-[100px] items-center justify-center overflow-hidden">
              <NextImage
                src={absoluteUrl(field_contact_image.uri.url)}
                width={100}
                height={100}
                alt={field_contact_image.resourceIdObjMeta.alt}
                className="circle-clip"
              />
            </div>
            <p className="font-bold">{field_contact_name}</p>
            <p>{field_position}</p>
            <a
              href={`tel:${field_contact_phone}`}
              target="_blank"
              rel="noreferrer"
              className="hyperlink no-underline hover:underline"
            >
              {field_contact_phone}
            </a>
            <a
              href={`mailto:${field_contact_email}`}
              target="_blank"
              rel="noreferrer"
              className="hyperlink no-underline hover:underline"
            >
              {field_contact_email}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
