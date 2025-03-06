#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const frontmatter = require('front-matter');
const yaml = require('yaml');

const apr2 = new Date('2024-04-02');
const aug14 = new Date('2024-08-14');

const relevantTrainingData = glob.sync(path.join(__dirname, 'TrainingReadinessDTO*.json')).flatMap(file => {
    const trainingData = JSON.parse(fs.readFileSync(file, 'utf8'));
    return trainingData.filter(data => apr2 < new Date(data.calendarDate) && new Date(data.calendarDate) < aug14);
});

const entriesPath = path.join(__dirname, '..', 'src', 'entries');
const entries = fs.readdirSync(entriesPath);
console.log(entries.length)
entries.forEach(entry => {
    const { attributes, body } = frontmatter(fs.readFileSync(path.join(entriesPath, entry), 'utf8'));
    
    const updatedAttributes = enrich(reformat(attributes), relevantTrainingData);

    fs.writeFileSync(path.join(entriesPath, entry), `---\n${yaml.stringify(updatedAttributes)}---\n${body}`)
});

function reformat({ day, date, start, destination, end, sleep, mood }) {
    return {
        day,
        date,
        start,
        destination,
        end,
        sleep,
        mood,
    };
}

function enrich(attributes, trainingData) {
    const day = trainingData.find(data => new Date(data.calendarDate).getTime() === attributes.date.getTime());
    return {
        ...attributes,
        sleepScore: day?.sleepScore,
        garminFeedback: day?.feedbackShort,
        recoveryTime: day?.recoveryTime,
        recoveryTimeFactorFeedback: day?.recoveryTimeFactorFeedback,
        sleepHistoryFactorFeedback: day?.sleepHistoryFactorFeedback,
        trainingReadiness: day?.score,
    };
}
