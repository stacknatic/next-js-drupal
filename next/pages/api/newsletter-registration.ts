import { NextApiRequest, NextApiResponse } from "next";
import { drupal } from "@/lib/drupal/drupal-client";
import { NewsletterRegistrationSchema } from "@/lib/zod/newsletter-registration";

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
      const validation = NewsletterRegistrationSchema.safeParse(body);
      // making post request only if the data is valid
      if (validation.success) {
        // in the drupal news, careers, events input fields are text which takes input either "Yes" or "No". Idealy it shoud be checkbox. But when I create a view for checkbox fields, it has two value either true or empty. But when I add checkbox field for filtering, it gives any, ture and false option. the false should corresponds empty but it does not. So, I have can not filter in or out empty fields. So, I am sending "Yes" for true and "No" for false value. As, news, careers and events field in drupal are textfield, and these fields can be used for filtereing in views.
        let data = validation.data;
        if (data.news) {
          data = { ...data, news: "Yes" };
        } else {
          data = { ...data, news: "No" };
        }
        if (data.careers) {
          data = { ...data, careers: "Yes" };
        } else {
          data = { ...data, careers: "No" };
        }
        if (data.events) {
          data = { ...data, events: "Yes" };
        } else {
          data = { ...data, events: "No" };
        }
        // Submit to Drupal.
        const result = await drupal.fetch(url.toString(), {
          method: "POST",
          body: JSON.stringify({
            webform_id: "newsletter_registration",
            email: data.email,
            privacy: data.privacy,
            news: data.news,
            careers: data.careers,
            events: data.events,
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
