import React, { useRef } from 'react';
import { activateOnFocus, isActiveEntry } from '../ActiveEntryContext';
import { MarkdownNode } from '../types';

function title(today: MarkdownNode["frontmatter"], yesterday: Pick<MarkdownNode["frontmatter"], "destination" | "end"> | undefined) {
    let startLocation;
    let daySummary;
    if (!yesterday) {
      startLocation = today.start;
    } else {
      startLocation = yesterday.destination || `Mile ${yesterday.end}`;
    }
    const endLocation = today.destination || `Mile ${today.end}`;
    if (startLocation === endLocation) {
      daySummary = endLocation;
    } else {
      daySummary = `${startLocation} to ${endLocation}`;
    }
    return `AT Day ${today.day}: ${daySummary}`
  }

  function sleep(sleep: MarkdownNode["frontmatter"]["sleep"]) {
    const symbols = { Tent: '🏕️', Shelter: '🛖', Building: '🏠' };
    return (
      <abbr title={sleep}>{symbols[sleep]}</abbr>
    );
  }

  function sleepScore(score: MarkdownNode["frontmatter"]["sleepScore"]) {
    let symbol: string;
    if (score > 70) {
      symbol = '🤩';
    } else if (score > 55) {
      symbol = '🙃';
    } else if (score > 45) {
      symbol = '😶‍🌫️';
    } else if (score > 35) {
      symbol = '🥱';
    } else if (score > 25) {
      symbol = '😳';
    } else if (score > 15) {
      symbol = '😪';
    } else if (score > 5) {
      symbol = '😵‍💫';
    } else if (score) {
      symbol = '☠️';
    } else {
      symbol = '🤷';
    }
    return !!symbol && (
      <abbr title={score ? `${score}/100` : 'no record'}>{symbol}</abbr>
    );
  }

  function garminFeedback(feedback: MarkdownNode["frontmatter"]["garminFeedback"]) {
    const charMap: Record<MarkdownNode["frontmatter"]["garminFeedback"], string> = {
      TIME_TO_RECHARGE: '🪫',
      LISTEN_TO_YOUR_BODY: '🤕',
      FOCUS_ON_RECOVERY: '😰',
      FIND_TIME_TO_RELAX: '😰',
      LET_YOUR_BODY_RECOVER: '🤕',
      TAKE_IT_EASY: '🫨',
      TIME_TO_SLOW_DOWN: '🥵',
      BALANCE_STRESS_AND_RECOVERY: '🫠',
      FOCUS_ON_SLEEP_PATTERNS: '🥱',
      FOCUS_ON_SLEEP_QUALITY: '🥱',
      FOCUS_ON_ENERGY_LEVELS: '😩',
      RECOVERY_IN_PROGRESS: '🙂‍↕️',
      GOOD_SLEEP_LAST_NIGHT: '😃',
      GOOD_RECOVERY: '😀',
      WELL_RECOVERED: '😃',
      RECOVERED_AND_READY: '🫠',
      READY_FOR_THE_DAY: '😎',
      TAKE_ON_THE_DAY: '🤩',
    }
    const title = feedback.replaceAll('_', ' ').toLowerCase();
    return (
      <abbr title={title}>{charMap[feedback]}</abbr>
    );
  }

  function trainingReadiness(readiness: MarkdownNode["frontmatter"]["trainingReadiness"]) {
    let symbol: string;
    if (readiness > 60) {
      symbol = '💪';
    } else if (readiness > 50) {
      symbol = '😎';
    } else if (readiness > 35) {
      symbol = '🫥';
    } else if (readiness > 10) {
      symbol = '😰';
    } else if (readiness > 5) {
      symbol = '🥵';
    } else if (readiness) {
      symbol = '🧟';
    } else {
      symbol = '🤷';
    }
    return !!symbol && (
      <abbr title={readiness ? `${readiness}/100` : 'no record'}>{symbol}</abbr>
    );
  }
  
  export default function Entry({ frontmatter, html, previous }: MarkdownNode & { previous: Pick<MarkdownNode["frontmatter"], "destination" | "end"> | undefined }) {
    const date = frontmatter.date.split('T')[0];
    const linkRef = useRef<HTMLElement | null>(null);
    const focusRef = activateOnFocus(date);
    const combinedRef = (element: HTMLElement) => {
      linkRef.current = element;
      focusRef(element);
    }
    const miles = {
      traveled: (frontmatter.end - (previous?.end || 0)).toFixed(1),
      start: previous?.end || 0,
      end: frontmatter.end,
    };
  
    return (
      <article ref={combinedRef} className={(isActiveEntry(date) ? "entry entry-active" : "entry")}>
        <h2 className="cursor-pointer" id={date} onClick={() => linkRef.current?.scrollIntoView()}>
          {title(frontmatter, previous)}
        </h2>
        <div className="flex gap-4 text-sm">
          <div>{new Date(frontmatter.date).toLocaleDateString('en-US', { timeZone: 'UTC'})}</div>
          <div>{miles.traveled} miles</div>
          <div>{miles.start} to {miles.end} miles</div>
        </div>
        <div className="flex gap-4 text-sm">
          <div>Slept in: {sleep(frontmatter.sleep)}</div>
          <div>Sleep quality: {sleepScore(frontmatter.sleepScore)}</div>
          <div>State: {garminFeedback(frontmatter.garminFeedback)}</div>
          <div>Mood: {frontmatter.mood}</div>
          <div>Readiness: {trainingReadiness(frontmatter.trainingReadiness)}</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    )
  }
  