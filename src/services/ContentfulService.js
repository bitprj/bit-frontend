import { createClient } from 'contentful';

const client = createClient({
    space: 'aq4puo31m564',
    accessToken: 'JEvRcauV8GVKsh3-VSW3Klc9WSnUKNzsvcfwRb6A9F4'
})

class ContentfulService {
    async getCardContent(cardID) {
        // return client.getEntries({ content_type: 'card' });
        return client.getEntry(cardID).then(response => response.fields);
    }

    async getSteps(steps) {
        const slides = await Promise.all(steps.map(async stepInfo => {
            const stepID = stepInfo.sys.id;
            const slide = await this.getStepContent(stepID).then(step => ({
                title: step.title,
                content: step.content
            }))
            return slide;
        }));

        return slides
    }

    async getConceptContent(conceptID) {
        return client.getEntry(conceptID)
            .then(response => {
                return this.getSteps(response.fields.steps).then(slides => slides);
            });
    }

    async getStepContent(stepID) {
        return client.getEntry(stepID).then(response => response.fields)
        // return client.getEntry(stepID);
    }
}

export default ContentfulService;