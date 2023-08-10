const mongoose = require('mongoose')

const ResearchPaperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: Number,
        required: true,
    },
    doi: {
        type: String,
        required: true,
    },
    claim: {
        type: String,
        required: true,
    },
    evidence: {
        type: String,
        required: true,
    },
})

module.exports = ResearchPaper = mongoose.model('researchPaper', ResearchPaperSchema)
