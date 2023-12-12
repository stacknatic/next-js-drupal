import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { StatusMessage } from "@/ui/status-message";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewsletterRegistrationSchema,
  NewsletterRegistrationType,
} from "@/lib/zod/newsletter-registration";

export function NewsletterRegistration() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<NewsletterRegistrationType>({
    resolver: zodResolver(NewsletterRegistrationSchema),
  });

  const onSubmit = async (data: NewsletterRegistrationType) => {
    const formdataValidation = NewsletterRegistrationSchema.safeParse(data);

    // reset();
    if (formdataValidation.success) {
      let validData = formdataValidation.data;
      // if none is selected for news, careers and events, the user will be registered for all the newsletters
      if (!validData.careers && !validData.news && !validData.events) {
        validData = { ...validData, careers: true, news: true, events: true };
      }

      const response = await fetch(`/api/newsletter-registration`, {
        method: "POST",
        body: JSON.stringify({
          email: validData.email,
          privacy: validData.privacy,
          news: validData.news,
          careers: validData.careers,
          events: validData.events,
        }),
        // This will record the submission with the right language:
        headers: {
          "accept-language": router.locale,
        },
      });
      if (!response.ok) {
        alert("Error!");
      }
    }
  };

  // const onErrors = (errors) => console.error(errors);

  if (isSubmitSuccessful) {
    return (
      <div className="md:pr-[2rem]">
        <StatusMessage
          level="success"
          className="mx-auto w-full max-w-3xl rounded-md"
        >
          <p className="mb-4">
            You have been successfully registered to the news letters!
          </p>
          <Button type="button" onClick={() => reset()}>
            X
          </Button>
        </StatusMessage>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex mb-4 max-w-3xl flex-col gap-5 md:pr-[2rem]"
    >
      <h3 className="text-heading-sm ">Stay up to date with our newsletter</h3>
      <p>
        "<span className="text-error">*</span>" indicates required fields
      </p>
      <p className="uppercase tracking-wider">I'M INTERESTED IN</p>
      <div className="w-full flex items-start gap-2">
        <div className="w-full flex gap-1 items-center ">
          <input type="checkbox" id="news" {...register("news")} />
          <label htmlFor="news">Wunder news</label>
        </div>
        <div className="w-full flex gap-1 items-center ">
          <input type="checkbox" id="careers" {...register("careers")} />
          <label htmlFor="careers">Careers</label>
        </div>
        <div className="w-full flex gap-1 items-center ">
          <input type="checkbox" id="events" {...register("events")} />
          <label htmlFor="events">Events</label>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 pt-4">
        <label className="uppercase tracking-wider" htmlFor="email">
          Email<sup className="text-error text-md">*</sup>
        </label>
        <input
          className="border-b border-b-1 p-4 ring-0 min-w-[2rem] focus:border-b-2 focus:border-primary-400"
          placeholder="email"
          type="email"
          id="email"
          {...register("email", {
            required: true,
          })}
        />
        {errors.email && <p className="text-error">{errors.email.message}</p>}
      </div>
      <div className="w-full flex flex-col gap-2 pt-4">
        <div className="w-full flex gap-1 items-center ">
          <input type="checkbox" id="privacy" {...register("privacy")} />
          <label htmlFor="privacy">
            I approve that Wunder processes my personal data according to its
            Privacy Policy.
          </label>
          <sup className="text-error">*</sup>
        </div>
        {errors.privacy && (
          <p className="text-error">{errors.privacy.message}</p>
        )}
        <p className="py-4">
          If you do not select any of the newsletter option, you will be
          registered for all newsletters.
        </p>
      </div>
      <Button type="submit">
        {isSubmitting ? "Submitting....." : "Submit"}
      </Button>
    </form>
  );
}
