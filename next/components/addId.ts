import * as cheerio from 'cheerio';

const addId = (content: string) => {
    if (typeof window === 'undefined') {
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
    }

    return content;
};

export default addId;
