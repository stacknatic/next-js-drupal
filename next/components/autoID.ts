import * as cheerio from 'cheerio';
import { ElementType } from 'react';

const addId = (content?: any) => {
  const $ = cheerio.load(content);

  if ($('h2').length < 1) {
    return content;
  }

  $('h2').each((index, element) => {
    const $element = $(element);
    const headingText = $element.text();
    const headingId = headingText.toLowerCase().replace(/\s/g, '-');
    $element.attr('id', headingId);
  });

  return $.html();
};

export default addId;
