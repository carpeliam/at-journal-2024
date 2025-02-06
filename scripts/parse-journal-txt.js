#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {default: slugify} = require('@sindresorhus/slugify');

journalFileName = process.argv[process.argv.length - 1];
const journalFileLocation = path.join(process.cwd(), journalFileName);

const input = fs.readFileSync(journalFileLocation, 'utf8');
const inputSeparatedByDays =input.split(/(Day \d+ \| \w{3} \d{1,2}, \d{4})/);

const journalKeys = ['Location', 'Start', 'End', 'Miles', 'Sleep', 'Mood'];
const bodyRegexp = new RegExp(`${journalKeys.map((key) => `${key}: (?<${key.toLowerCase()}>[^\\n]*)\\n`).join('')}(?<rest>.*)`, 's');

for (var i = 1; i < inputSeparatedByDays.length; i++) {
    const title = inputSeparatedByDays[i];
    const body = inputSeparatedByDays[++i];

    const [day, dateString] = title.split(' | ');
    const date = new Date(Date.parse(dateString));
    const fields = {...body.match(bodyRegexp).groups};
    const getLocation = (loc) => ({...loc.match(/(?<location>.*[^\s])?\s?- (?<mile>\d+\.?\d*)/).groups});
    const getLocationName = (loc) => loc.location ? loc.location : `Mile ${loc.mile}`;
    fields.start = getLocation(fields.start);
    fields.end = getLocation(fields.end);
    const data = {title: `AT ${day}: ${getLocationName(fields.start)} to ${getLocationName(fields.end)}`, date, ...fields};
    output = `---
title: "${data.title}"
date: ${data.date.toISOString().split('T')[0]}
location: ${data.start.location}
start: ${data.start.mile}
end: ${data.end.mile}
miles: ${data.miles}
sleep: ${data.sleep}
mood: ${data.mood}
---
${data.rest.trim()}`;

    fs.writeFileSync(path.join(__dirname, '..', 'src', 'entries', `${slugify(data.title)}.md`), output);
}
