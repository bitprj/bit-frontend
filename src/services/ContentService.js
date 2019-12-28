import { createClient } from 'contentful';

const client = createClient({
    space: 'pzyvtdq9rd3m',
    accessToken: 'KALCGtRrMBhwxFWoocht9nVHhkRBGR0xkbDcnT6OXIU'
})

class ContentService {
    async getCardContent(labID) {
        return client.getEntries({ content_type: 'card' });
    }
}

export default ContentService;