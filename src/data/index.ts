import { TopicId, TopicMeta, Lesson, MCQ, CodingQuestion } from '../types';
import { TOPICS_META } from './topicsMeta';
import { inputOutputLessons, inputOutputMCQs, inputOutputCodingQuestions } from './topics/input-output';
import { operatorsLessons, operatorsMCQs, operatorsCodingQuestions } from './topics/operators-expressions';
import { decisionLessons, decisionMCQs, decisionCodingQuestions } from './topics/decision-making';
import { loopingLessons, loopingMCQs, loopingCodingQuestions } from './topics/looping';

export { TOPICS_META } from './topicsMeta';

export function getAllTopics(): TopicMeta[] {
  return TOPICS_META;
}

export function getTopicMeta(topicId: TopicId): TopicMeta | undefined {
  return TOPICS_META.find((t) => t.id === topicId);
}

export function getTopicLessons(topicId: TopicId): Lesson | undefined {
  switch (topicId) {
    case 'input-output':
      return inputOutputLessons;
    case 'operators-expressions':
      return operatorsLessons;
    case 'decision-making':
      return decisionLessons;
    case 'looping':
      return loopingLessons;
    default:
      return undefined;
  }
}

export function getTopicMCQs(topicId: TopicId): MCQ[] {
  switch (topicId) {
    case 'input-output':
      return inputOutputMCQs;
    case 'operators-expressions':
      return operatorsMCQs;
    case 'decision-making':
      return decisionMCQs;
    case 'looping':
      return loopingMCQs;
    default:
      return [];
  }
}

export function getTopicCodingQuestions(topicId: TopicId): CodingQuestion[] {
  switch (topicId) {
    case 'input-output':
      return inputOutputCodingQuestions;
    case 'operators-expressions':
      return operatorsCodingQuestions;
    case 'decision-making':
      return decisionCodingQuestions;
    case 'looping':
      return loopingCodingQuestions;
    default:
      return [];
  }
}
