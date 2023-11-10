import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode, DrupalTranslatedPath } from "next-drupal";

import { Meta } from "@/components/meta";
import {
  createLanguageLinks,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { ResourceType } from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import EventSingle from "@/components/events/event-single";
import {
  EventSingleSchema,
  EventSingleType,
  SpeakerSchema,
  SpeakerType,
} from "@/lib/zod/event-single";
import { OrganizerSchema, OrganizerType } from "@/lib/zod/event-card";

interface PageProps extends CommonPageProps {
  resource: EventSingleType;
  languageLinks: LanguageLinks;
}
export default function Event({ resource }: PageProps) {
  if (!resource) return null;

  return (
    <>
      <Meta title={resource.title} metatags={resource.metatag} />
      <EventSingle event={resource} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = await drupal.getStaticPathsFromContext("node--events", context);
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const path = await drupal.translatePathFromContext(context, {
    pathPrefix: "/events",
  });
  if (!path) {
    return {
      notFound: true,
    };
  }

  const type = path.jsonapi.resourceName as ResourceType;

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params: getNodePageJsonApiParams("node--events").getQueryObject(),
    },
  );

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
  }

  // Add information about possible other language versions of this node.
  const nodeTranslations = await getNodeTranslatedVersions(
    resource,
    context,
    drupal,
  );
  const languageLinks = createLanguageLinks(nodeTranslations);
  // event data validation. Organizer and Speaker valideation will be done seperately so that failaing any of these does not fail whole event
  const validatedEventTopLevel = EventSingleSchema.omit({
    field_organizers: true,
    field_speakers: true,
  }).parse(resource);

  const validateOrganizers = resource.field_organizers.reduce(
    (acc: OrganizerType[], org: any) => {
      const validOrg = OrganizerSchema.safeParse(org);
      if (validOrg.success) {
        return [...acc, validOrg.data];
      }
    },
    [],
  );

  const validateSpeakers = resource.field_speakers.reduce(
    (acc: SpeakerType[], spk: any) => {
      const validSpk = SpeakerSchema.safeParse(spk);
      if (validSpk.success) {
        return [...acc, validSpk.data];
      }
    },
    [],
  );
  // creating whole validated Event object
  const validatedEvent = {
    ...validatedEventTopLevel,
    field_organizers: validateOrganizers,
    field_speakers: validateSpeakers,
  };

  return {
    props: {
      ...(await getCommonPageProps(context)),
      resource: validatedEvent,
      languageLinks,
    },
    revalidate: 60,
  };
};
