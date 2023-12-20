import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { Button } from '@/ui/button';
import { StatusMessage } from '@/ui/status-message';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BaseEventRegistrationSchema,
  EventRegistrationInputType,
  EventRegistrationSchema,
} from '@/lib/zod/event-registration';

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

  const [showStatusMessage, setShowStatusMessage] = useState(false);
  const statusMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusMessageRef.current && !statusMessageRef.current.contains(event.target as Node)) {
        setShowStatusMessage(false);
      }
    }

    if (showStatusMessage) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStatusMessage]);

  const onSubmit = async (data: EventRegistrationInputType) => {
    const formdataValidation = EventRegistrationSchema.safeParse({
      ...data,
      even_title: eventTitle,
    });

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
        headers: {
          "accept-language": router.locale,
        },
      });

      if (response.ok) {
        setShowStatusMessage(true);
        reset();
      } else {
        alert("Error!");
      }
    }
  };

  if (showStatusMessage) {
    return (
      <div ref={statusMessageRef}>
        <StatusMessage
          level="success"
          className="mx-auto w-full max-w-3xl rounded-md bg-secondary-100"
        >
          <p className="mb-4">
            You have been successfully registered to the event!
          </p>
        </StatusMessage>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto flex mb-4 max-w-3xl flex-col md:gap-2 gap-5 md:px-[2rem]"
    >
      <h3 className="text-heading-sm mt-4 md:font-bold">Join?</h3>
      <div className="w-full flex flex-col gap-3 md:gap-2">
        <label htmlFor="name">Name</label>
        <input
          className="border border-1 p-4 md:p-2 rounded-md ring-0 focus:border-2 focus:border-primary-400 bg-none"
          placeholder="name"
          type="text"
          id="name"
          {...register("name", {
            required: true,
          })}
        />
        {errors.name && <p className="text-error">{errors.name.message}</p>}
      </div>
      <div className="w-full flex flex-col gap-3 md:gap-2">
        <label htmlFor="email">Email</label>
        <input
          className="border border-1 p-4 md:p-2 rounded-md ring-0 min-w-[2rem] focus:border-2 focus:border-primary-400"
          placeholder="email"
          type="email"
          id="email"
          {...register("email", {
            required: true,
          })}
        />
        {errors.email && <p className="text-error">{errors.email.message}</p>}
      </div>
      <div className="w-full flex flex-col gap-3 md:gap-2">
        <label htmlFor="message">Message</label>
        <textarea
          className="border border-1 p-4 md:p-2 rounded-md ring-0 min-h-[8rem] focus:border-2 focus:border-primary-400"
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
      <Button type="submit" className="rounded-full mt-2">
        {isSubmitting ? "Joining....." : "Want to join"}
      </Button>
    </form>
  );
}
