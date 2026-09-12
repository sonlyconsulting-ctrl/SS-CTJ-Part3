import { CheckpointDefinition, DayDefinition } from './types';

export const APP_VERSION = '2.0-CANDIDATE';
export const STORAGE_KEY_STATE = 'ctj.part3.state.v2';
export const STORAGE_KEY_SETTINGS = 'ctj.part3.settings.v2';

export const DAYS: DayDefinition[] = [
  {
    day: 1, week: 1, title: 'Understanding Mindsets',
    theme: 'Mindsets shape what you notice, expect, and choose. Making the lens visible creates room to decide whether it still serves the situation.',
    frameworkName: 'Mindset Audit',
    framework: 'Name the mindset, identify its effect on action, trace what may reinforce it, and define a credible alternative lens.',
    logicTip: 'A mindset can influence the frame without determining the choice.',
    prompts: [
      { id: 'd1-map', kind: 'map', label: 'Map the Lens', text: 'Choose a mindset that often shapes one area of your life. Describe its impact on decisions and one alternative mindset you could deliberately test.', guide: 'Up to 100 words' },
      { id: 'd1-p1', kind: 'core', label: 'Prompt 1', text: 'Write one mindset that regularly influences your decisions.', guide: 'Up to 25 words' },
      { id: 'd1-p2', kind: 'core', label: 'Prompt 2', text: 'Using Mindset Audit, describe how the mindset affects your actions and name an alternative lens.', guide: '50 to 75 words' },
      { id: 'd1-p3', kind: 'core', label: 'Prompt 3', text: 'What past experience, fear, incentive, or habit may be reinforcing the current mindset?', guide: '50 to 100 words' },
      { id: 'd1-bonus', kind: 'optional', label: 'Bonus', text: 'What would change if you treated the alternative mindset as a temporary experiment rather than a permanent identity?', guide: 'Short reflection' },
      { id: 'd1-deeper', kind: 'optional', label: 'Dig Deeper', text: 'Explain the current and alternative mindset to someone you trust and note what becomes clearer.', guide: '50 to 100 words' }
    ]
  },
  {
    day: 2, week: 1, title: 'Affective Labeling',
    theme: 'Naming an emotion can make its influence easier to examine. The goal is not to remove feeling, but to separate the signal from the reaction.',
    frameworkName: 'Emotion Map',
    framework: 'Name the emotion, identify the trigger, describe its effect on thinking and action, then choose what information the emotion should and should not control.',
    logicTip: 'Naming the emotion can create space between feeling and decision.',
    prompts: [
      { id: 'd2-map', kind: 'map', label: 'Map the Emotion', text: 'Recall a recent decision influenced by a strong emotion. Name the emotion, trigger, and impact on your thinking.', guide: 'Up to 100 words' },
      { id: 'd2-p1', kind: 'core', label: 'Prompt 1', text: 'Write about one recent strong emotion that influenced a decision.', guide: 'Up to 25 words' },
      { id: 'd2-p2', kind: 'core', label: 'Prompt 2', text: 'Using Emotion Map, name the emotion, trigger, and the way it shaped your interpretation or action.', guide: '50 to 75 words' },
      { id: 'd2-p3', kind: 'core', label: 'Prompt 3', text: 'How could labeling the emotion change the way you handle a similar decision next time?', guide: '50 to 100 words' },
      { id: 'd2-bonus', kind: 'optional', label: 'Bonus', text: 'Practice labeling a current emotion and note whether the intensity, meaning, or next action changes.', guide: 'Label plus reflection' },
      { id: 'd2-deeper', kind: 'optional', label: 'Dig Deeper', text: 'Explain affective labeling in simple language using a short story or example.', guide: '50 to 100 words' }
    ]
  },
  {
    day: 3, week: 1, title: 'Cognitive Scripts',
    theme: 'Recurring patterns can become scripts that run before you notice them. Naming the script creates a chance to choose whether to follow, revise, or interrupt it.',
    frameworkName: 'Script Analysis',
    framework: 'Identify the recurring script, consider where it came from, name what it produces, and write a more useful script for a specific situation.',
    logicTip: 'A repeated pattern is evidence of a script, not proof that the script is destiny.',
    prompts: [
      { id: 'd3-map', kind: 'map', label: 'Map the Script', text: 'Choose a recurring decision pattern. Describe its likely origin, the action it tends to produce, and a revised script for one real situation.', guide: 'Up to 100 words' },
      { id: 'd3-p1', kind: 'core', label: 'Prompt 1', text: 'Write one recurring decision pattern you notice in yourself.', guide: 'Up to 25 words' },
      { id: 'd3-p2', kind: 'core', label: 'Prompt 2', text: 'Using Script Analysis, identify where the pattern may come from and write a new script you could test.', guide: '50 to 75 words' },
      { id: 'd3-p3', kind: 'core', label: 'Prompt 3', text: 'How does the current script limit or support your choices, and what evidence would show the new script is better?', guide: '50 to 100 words' },
      { id: 'd3-bonus', kind: 'optional', label: 'Bonus', text: 'Rewrite the script for one specific decision and name the behavior that would be different.', guide: 'New script plus explanation' },
      { id: 'd3-deeper', kind: 'optional', label: 'Dig Deeper', text: 'Compare this script with the version you were using a year ago.', guide: '50 to 100 words' }
    ]
  },
  {
    day: 4, week: 1, title: 'Decision Clarity',
    theme: 'Some decisions become clearer when logic, emotion, values, and action are examined together instead of letting one dimension dominate.',
    frameworkName: 'Head-Heart-Hand',
    framework: 'Head names the logic and evidence. Heart names the emotional or intuitive signal. Hand names the action that fits the decision and its values.',
    logicTip: 'Clarity improves when logic, emotion, and action are visible enough to compare.',
    prompts: [
      { id: 'd4-map', kind: 'map', label: 'Map the Decision', text: 'Choose a decision you are unsure about. What does the evidence suggest, what does the emotional or intuitive signal say, and what action appears most aligned?', guide: 'Up to 100 words' },
      { id: 'd4-p1', kind: 'core', label: 'Prompt 1', text: 'Write one recent decision where you still feel uncertain.', guide: 'Up to 25 words' },
      { id: 'd4-p2', kind: 'core', label: 'Prompt 2', text: 'Using Head-Heart-Hand, describe the logical case, the emotional signal, and the possible action. Where do they agree or conflict?', guide: '50 to 75 words' },
      { id: 'd4-p3', kind: 'core', label: 'Prompt 3', text: 'Which core value or boundary should this decision respect, and how would you know if the action violates it?', guide: '50 to 100 words' },
      { id: 'd4-bonus', kind: 'optional', label: 'Bonus', text: 'What information would reduce the conflict without pretending uncertainty can disappear?', guide: 'Short reflection' },
      { id: 'd4-deeper', kind: 'optional', label: 'Dig Deeper', text: 'Explain the decision to a colleague or friend using the three-part framework.', guide: '50 to 100 words' }
    ]
  },
  {
    day: 5, week: 1, title: 'Self-Anthropology',
    theme: 'Observing energy, emotion, attention, and decision patterns can reveal conditions that repeatedly shape judgment and follow-through.',
    frameworkName: 'Observation Log',
    framework: 'Track energy, emotion, context, and key decisions, then look for repeated patterns without turning one day into a permanent label.',
    logicTip: 'Observation becomes useful when the pattern is specific enough to test.',
    prompts: [
      { id: 'd5-map', kind: 'map', label: 'Observe the Day', text: 'Choose a recent day with a noticeable shift in energy or emotion. Track the shift, the context, and the decisions made around it.', guide: 'Up to 100 words' },
      { id: 'd5-p1', kind: 'core', label: 'Prompt 1', text: 'Write about a day when your energy or emotions changed noticeably.', guide: 'Up to 25 words' },
      { id: 'd5-p2', kind: 'core', label: 'Prompt 2', text: 'Using Observation Log, track energy, emotion, context, and decisions. What pattern appears?', guide: '50 to 75 words' },
      { id: 'd5-p3', kind: 'core', label: 'Prompt 3', text: 'How could this pattern improve a future decision, schedule, boundary, or recovery choice?', guide: '50 to 100 words' },
      { id: 'd5-bonus', kind: 'optional', label: 'Bonus', text: 'Log one current day and compare it with the earlier pattern.', guide: 'Log plus reflection' },
      { id: 'd5-deeper', kind: 'optional', label: 'Dig Deeper', text: 'Share one observation with a trusted person and ask what they notice that you may be missing.', guide: '50 to 100 words' }
    ]
  },
  {
    day: 6, week: 2, title: 'Aligning with Purpose',
    theme: 'Purpose becomes practical when values can be connected to observable actions and gaps between stated priorities and actual behavior.',
    frameworkName: 'Purpose Map',
    framework: 'Name the value, list actions that express it, identify where behavior diverges, and choose one gap small enough to address.',
    logicTip: 'A stated value becomes more useful when you can see how it changes action.',
    prompts: [
      { id: 'd6-map', kind: 'map', label: 'Map the Value', text: 'Choose one core value. List actions that reflect it and one place where your behavior or commitments are not aligned.', guide: 'Up to 100 words' },
      { id: 'd6-p1', kind: 'core', label: 'Prompt 1', text: 'Write one core value that matters to you now.', guide: 'Up to 25 words' },
      { id: 'd6-p2', kind: 'core', label: 'Prompt 2', text: 'Using Purpose Map, identify actions that support the value and one alignment gap.', guide: '50 to 75 words' },
      { id: 'd6-p3', kind: 'core', label: 'Prompt 3', text: 'What is one realistic action that would close part of the gap, and what tradeoff would it require?', guide: '50 to 100 words' },
      { id: 'd6-bonus', kind: 'optional', label: 'Bonus', text: 'Choose a purposeful action and explain the effect you expect it to have.', guide: 'Action plus explanation' },
      { id: 'd6-deeper', kind: 'optional', label: 'Dig Deeper', text: 'Explain purposeful living in simple language using a concrete story.', guide: '50 to 100 words' }
    ]
  },
  {
    day: 7, week: 2, title: 'Managing Emotional Triggers',
    theme: 'A trigger can narrow the available response before deliberate thinking catches up. Recognizing the sequence creates room for a conscious response.',
    frameworkName: 'Trigger Response',
    framework: 'Identify the trigger, name the emotion and automatic impulse, then define a conscious response and the pause needed to make it possible.',
    logicTip: 'A pause does not erase the emotion. It changes whether the emotion becomes the only driver.',
    prompts: [
      { id: 'd7-map', kind: 'map', label: 'Map the Trigger', text: 'Recall a recent emotional trigger. Identify the trigger, emotion, automatic impulse, and a conscious response you could choose instead.', guide: 'Up to 100 words' },
      { id: 'd7-p1', kind: 'core', label: 'Prompt 1', text: 'Write about one recent emotional trigger.', guide: 'Up to 25 words' },
      { id: 'd7-p2', kind: 'core', label: 'Prompt 2', text: 'Using Trigger Response, name the trigger, emotion, and one conscious response that would better serve the situation.', guide: '50 to 75 words' },
      { id: 'd7-p3', kind: 'core', label: 'Prompt 3', text: 'What signal, boundary, or preparation could help you recognize this trigger earlier next time?', guide: '50 to 100 words' },
      { id: 'd7-bonus', kind: 'optional', label: 'Bonus', text: 'What part of the situation can you influence even when the trigger itself cannot be controlled?', guide: 'Short reflection' },
      { id: 'd7-deeper', kind: 'optional', label: 'Today’s Challenge', text: 'Diagram the trigger, impulse, pause, and chosen response as a simple flow.', guide: '50 to 75 words or equivalent outline' }
    ]
  },
  {
    day: 8, week: 2, title: 'Complex Life Scenarios',
    theme: 'Complex situations often contain multiple facts, emotions, obligations, values, and unknowns. Breaking them apart can reveal where choice still exists.',
    frameworkName: 'Scenario Breakdown',
    framework: 'List the major factors, emotions, constraints, unknowns, values, and possible responses before selecting a path.',
    logicTip: 'Complexity becomes more manageable when the parts are visible and the unknowns stay labeled as unknowns.',
    prompts: [
      { id: 'd8-map', kind: 'map', label: 'Break Down the Scenario', text: 'Choose a complex life situation with no easy answer. List the major factors, emotions, constraints, unknowns, and one purpose-aligned option.', guide: 'Up to 100 words' },
      { id: 'd8-p1', kind: 'core', label: 'Prompt 1', text: 'Write one complex life scenario where no option feels obviously correct.', guide: 'Up to 25 words' },
      { id: 'd8-p2', kind: 'core', label: 'Prompt 2', text: 'Using Scenario Breakdown, separate facts, emotions, constraints, unknowns, and one purpose-aligned solution.', guide: '50 to 75 words' },
      { id: 'd8-p3', kind: 'core', label: 'Prompt 3', text: 'Which value or purpose should guide the choice, and what information could still change the decision?', guide: '50 to 100 words' },
      { id: 'd8-bonus', kind: 'optional', label: 'Bonus', text: 'Create a map of the scenario with the guiding value at the center.', guide: 'Map description plus explanation' },
      { id: 'd8-deeper', kind: 'optional', label: 'Dig Deeper', text: 'Compare your approach with someone you respect and identify one useful difference.', guide: '50 to 100 words' }
    ]
  },
  {
    day: 9, week: 2, title: 'Mapping a Conscious Life',
    theme: 'Intentional direction becomes easier to examine when thoughts, emotions, values, commitments, and tradeoffs are visible together.',
    frameworkName: 'Life Blueprint',
    framework: 'Map the thoughts, emotions, values, commitments, and tradeoffs surrounding a decision that affects your direction.',
    logicTip: 'A blueprint is useful because it can be revised when the life around it changes.',
    prompts: [
      { id: 'd9-map', kind: 'map', label: 'Draft the Blueprint', text: 'Choose a decision shaping your direction. Map the thoughts, emotions, values, commitments, and tradeoffs that surround it.', guide: 'Up to 100 words' },
      { id: 'd9-p1', kind: 'core', label: 'Prompt 1', text: 'Write one decision that is shaping the direction of your life or work.', guide: 'Up to 25 words' },
      { id: 'd9-p2', kind: 'core', label: 'Prompt 2', text: 'Using Life Blueprint, outline the thoughts, emotions, values, and commitments attached to the decision.', guide: '50 to 75 words' },
      { id: 'd9-p3', kind: 'core', label: 'Prompt 3', text: 'Where could misalignment, overcommitment, or an ignored tradeoff weaken the blueprint?', guide: '50 to 100 words' },
      { id: 'd9-bonus', kind: 'optional', label: 'Bonus', text: 'Create a blueprint for a project or community effort tied to one value.', guide: 'Blueprint plus explanation' },
      { id: 'd9-deeper', kind: 'optional', label: 'Dig Deeper', text: 'Explain why a conscious life still needs revision rather than a perfect master plan.', guide: '50 to 100 words' }
    ]
  },
  {
    day: 10, week: 2, title: 'Living with Intention',
    theme: 'Intentional living connects choice to purpose while leaving room to revise as circumstances, knowledge, and priorities change.',
    frameworkName: 'Before & After',
    framework: 'Compare a less intentional choice with a more purposeful one. Identify what changed in the reasoning, values, boundaries, and follow-through.',
    logicTip: 'Intention is visible in the relationship between values and repeated choices, not in one perfect decision.',
    prompts: [
      { id: 'd10-map', kind: 'map', label: 'Compare the Choices', text: 'Compare one meaningful intentional choice with a less deliberate one. Identify what changed in the reasoning, values, boundaries, or follow-through.', guide: 'Up to 100 words' },
      { id: 'd10-p1', kind: 'core', label: 'Prompt 1', text: 'Write about one meaningful choice you made with intention.', guide: 'Up to 25 words' },
      { id: 'd10-p2', kind: 'core', label: 'Prompt 2', text: 'Using Before & After, compare that choice with a less intentional one. What specifically changed?', guide: '50 to 75 words' },
      { id: 'd10-p3', kind: 'core', label: 'Prompt 3', text: 'What practical rule, boundary, or review habit could help future choices stay connected to what matters?', guide: '50 to 100 words' },
      { id: 'd10-bonus', kind: 'optional', label: 'Bonus', text: 'Write a short note to your future self about what intentional living should not become.', guide: 'Short letter' },
      { id: 'd10-deeper', kind: 'optional', label: 'Dig Deeper', text: 'Share your biggest insight on intentional living and what evidence will tell you that you are practicing it.', guide: '50 to 100 words' }
    ]
  }
];

export const CHECKPOINTS: CheckpointDefinition[] = [
  {
    id: 'week1', afterDay: 5, title: 'Week 1 Checkpoint',
    prompt: 'Reflect on your progress in mindset and emotional clarity. Which mini-framework increased your awareness most, and what surprised you about the patterns you observed?',
    guide: '100 to 150 words'
  },
  {
    id: 'week2', afterDay: 10, title: 'Week 2 Checkpoint',
    prompt: 'Reflect on purposeful living. Which mini-framework most improved the alignment between values and action, and how has your sense of purpose changed or become more specific?',
    guide: '100 to 150 words'
  }
];

export const FINAL_REFLECTION_PROMPT =
  'Review Part 3. What is your biggest insight about meaning, emotion, values, and balance, and what will you do to keep future choices connected to what matters without treating purpose as fixed?';
