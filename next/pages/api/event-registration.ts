import { NextApiRequest, NextApiResponse } from "next";
import { drupal } from "@/lib/drupal/drupal-client";
import { EventRegistrationSchema } from "@/lib/zod/event-registration";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // The locale is passed in this header:
  const languagePrefix = req.headers["accept-language"];

  try {
    if (req.method === "POST") {
      const url = drupal.buildUrl(`/${languagePrefix}/webform_rest/submit`);
      const body = JSON.parse(req.body);
      // validation of the recieved data
      const validation = EventRegistrationSchema.safeParse(body);
      // making post request only if the data is valid
      if (validation.success) {
        const data = validation.data;
        // Submit to Drupal.
        const result = await drupal.fetch(url.toString(), {
          method: "POST",
          body: JSON.stringify({
            webform_id: "event_registration",
            name: data.name,
            email: data.email,
            message: data.message,
            even_title: data.even_title,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (result.ok) {
          res.status(200).end();
        } else {
          res.status(result.status).end();
          throw new Error();
        }
      } else {
        // throwing error when data validation fails
        throw new Error("Received data does not match expected criteria!");
      }
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
