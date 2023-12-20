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
import CheckmarkIcon from '@/styles/icons/checkmark.svg';

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
      className="w-full flex max-w-3xl flex-col lg:p-8 p-4 gap-5 md:pr-[2rem] bg-primary-700 text-white"
    >
      <h2 className="text-heading-sm ">Stay up to date with our newsletter</h2>
      <p>
        "<span className="font-bold">*</span>" indicates required fields
      </p>
      <p className="uppercase tracking-wider">I'M INTERESTED IN</p>
      <div className="w-full flex-col sm:flex sm:flex-row items-start gap-2">
        <div className="w-full flex gap-1 items-center py-2">
          <label htmlFor="news" className="cursor-pointer relative flex items-center">
            <input className="rounded-md w-5 h-5 mr-2 appearance-none border-2 border-white checked:bg-white hover:bg-white" type="checkbox" id="news" {...register("news")} />
            <CheckmarkIcon className="check-news h-5 w-5 absolute top-0 opacity-0 text-primary-700" />
            Wunder news
          </label>
        </div>
        <div className="w-full flex gap-1 items-center py-2">
          <label htmlFor="careers" className="cursor-pointer relative flex items-center">
          <input className="rounded-md w-5 h-5 mr-2 appearance-none border-2 border-white checked:bg-white hover:bg-white" type="checkbox" id="careers" {...register("careers")} />
          Careers
          <CheckmarkIcon className="check-careers h-5 w-5 absolute top-0 opacity-0 text-primary-700" />
          </label>
        </div>
        <div className="w-full flex gap-1 items-center py-2">
          <label htmlFor="events" className="cursor-pointer relative flex items-center">
          <input className="rounded-md w-5 h-5 mr-2 appearance-none border-2 border-white checked:bg-white hover:bg-white" type="checkbox" id="events" {...register("events")} />
          Events
          <CheckmarkIcon className="check-events h-5 w-5 absolute top-0 opacity-0 text-primary-700" />
          </label>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 pt-4">
        <label className="uppercase tracking-wider" htmlFor="email">
          Email<sup className="font-bold">*</sup>
        </label>
        <input
          className="text-info rounded-md p-4 min-w-[2rem] "
          placeholder="email"
          type="email"
          id="email"
          {...register("email", {
            required: true,
          })}
        />
        {errors.email && <p className="text-secondary-400">{errors.email.message}</p>}
      </div>
      <div className="w-full flex flex-col gap-2 pt-4">
        <div className="w-full flex gap-1 items-center ">
          <label htmlFor="privacy" className="cursor-pointer relative">
          <input className="rounded-md w-5 h-5 mr-2 mb-[-4px] appearance-none border-2 border-white checked:bg-white hover:bg-white" type="checkbox" id="privacy" {...register("privacy")} />
            I approve that Wunder processes my personal data according to its
            Privacy Policy.
            <CheckmarkIcon className="check-privacy h-5 w-5 absolute top-0 opacity-0 text-primary-700" />
          </label>
          <sup className="font-bold">*</sup>
        </div>
        {errors.privacy && (
          <p className="text-secondary-400">{errors.privacy.message}</p>
        )}
        <p className="py-4">
          If you do not select any of the newsletter option, you will be
          registered for all newsletters.
        </p>
      </div>
      <Button variant="quinary" type="submit" className="rounded-full shadow-xl">
        {isSubmitting ? "Subscribing....." : "Subscribe"}
      </Button>
    </form>
  );
}
