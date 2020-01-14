import { createClient } from 'contentful';

const client = createClient({
    space: 'aq4puo31m564',
    accessToken: 'JEvRcauV8GVKsh3-VSW3Klc9WSnUKNzsvcfwRb6A9F4'
})

class ContentfulService {
    async getCard(cardID) {
        return client.getEntry(cardID).then(response => response.fields);
    }

    async getConcept(conceptID) {
        return client.getEntry(conceptID)
            .then(response => {
                return this.getAllSteps(response.fields.steps).then(slides => slides);
            });
    }

    async getHint(hintID) {
        return client.getEntry(hintID)
            .then(response => {
                return this.getAllSteps(response.fields.steps).then(steps => {
                    return {
                        title: response.fields.name,
                        steps: steps
                    }
                });
            });
    }

    async getAllSteps(steps) {
        const slides = await Promise.all(steps.map(async (stepInfo, index) => {
            const stepID = stepInfo.sys.id;
            const slide = await this.getEachStep(stepID).then(step => ({
                id: stepID,
                heading: step.heading,
                content: step.content,
                image: step.image,
                snippet: step.snippet
            }));
            slide.isShown = (!index) ? true : false;
            return slide;
        }));
        return slides
    }

    async getEachStep(stepID) {
        return client.getEntry(stepID).then(response => response.fields);
    }

    /* ===== STUDENT */

    async fetch(objectID) {
        return client.getEntry(objectID)
            .then(response => response.fields)
            .catch(e => console.log(e))
    }

    // async fetchTrack(trackID) {
    //     return client.getEntry(trackID).then(response => response.fields)
    // }
}

export default ContentfulService;
