import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { StatusMessage } from "@/ui/status-message";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BaseEventRegistrationSchema,
  EventRegistrationInputType,
  EventRegistrationSchema,
} from "@/lib/zod/event-registration";

export function EventRegistration({ eventTitle }: { eventTitle: string }) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<EventRegistrationInputType>({
    resolver: zodResolver(BaseEventRegistrationSchema),
  });

  const onSubmit = async (data: EventRegistrationInputType) => {
    const formdataValidation = EventRegistrationSchema.safeParse({
      ...data,
      even_title: eventTitle,
    });
    reset();
    if (formdataValidation.success) {
      const validData = formdataValidation.data;
      const response = await fetch(`/api/event-registration`, {
        method: "POST",
        body: JSON.stringify({
          name: validData.name,
          email: validData.email,
          message: validData.message,
          even_title: validData.even_title,
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
            You have been successfully registered to the event!
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
      <h3 className="text-heading-sm ">Join us</h3>
      <div className="w-full flex flex-col gap-3">
        <label htmlFor="name">Name</label>
        <input
          className="border border-1 p-4 rounded-md ring-0 focus:border-2 focus:border-primary-400 bg-none"
          placeholder="name"
          type="text"
          id="name"
          {...register("name", {
            required: true,
          })}
        />
        {errors.name && <p className="text-error">{errors.name.message}</p>}
      </div>
      <div className="w-full flex flex-col gap-3">
        <label htmlFor="email">Email</label>
        <input
          className="border border-1 p-4 rounded-md ring-0 min-w-[2rem] focus:border-2 focus:border-primary-400"
          placeholder="email"
          type="email"
          id="email"
          {...register("email", {
            required: true,
          })}
        />
        {errors.email && <p className="text-error">{errors.email.message}</p>}
      </div>
      <div></div>
      <div className="w-full flex flex-col gap-3">
        <label htmlFor="message">Message</label>
        <textarea
          className="border border-1 p-4 rounded-md ring-0 min-h-[12rem] focus:border-2 focus:border-primary-400"
          placeholder="message"
          id="message"
          {...register("message", {
            required: false,
          })}
        />
        {errors.message && (
          <p className="text-error">{errors.message.message}</p>
        )}
      </div>
      <Button type="submit">
        {isSubmitting ? "Submitting....." : "Submit"}
      </Button>
    </form>
  );
}
