import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TopicId } from '../types';
import {
  getTopicMeta,
  getTopicLessons,
  getTopicMCQs,
  getTopicCodingQuestions,
  getAllTopics,
} from '../data';
import { NeuSegmented, SegmentOption } from '../components/common/NeuSegmented';
import { NeuDropdown } from '../components/common/NeuDropdown';
import { LearningArena } from '../components/learn/LearningArena';
import { MCQCheck } from '../components/mcq/MCQCheck';
import { CodingArena } from '../components/code/CodingArena';
import { storageService } from '../services/storageService';

type ArenaTab = 'learn' | 'mcq' | 'code';

export const TopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const validTopicId: TopicId = (topicId as TopicId) || 'input-output';
  const topicMeta = getTopicMeta(validTopicId);

  const [activeTab, setActiveTab] = useState<ArenaTab>('learn');
  const [, setTick] = useState(0); // force re-render on progress update

  // Data for current topic
  const lesson = getTopicLessons(validTopicId);
  const mcqs = getTopicMCQs(validTopicId);
  const codingQuestions = getTopicCodingQuestions(validTopicId);

  const handleProgressUpdate = () => {
    setTick((prev) => prev + 1);
  };

  if (!topicMeta) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-xl font-bold text-[var(--neu-text-primary)]">Topic Not Found</h2>
        <Link to="/dashboard" className="text-sm text-[var(--neu-accent)] mt-4 inline-block underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Segmented control tabs
  const tabOptions: Array<SegmentOption<ArenaTab>> = [
    {
      id: 'learn',
      label: 'Learning Arena',
      count: lesson?.sections.length || 0,
    },
    {
      id: 'mcq',
      label: 'MCQ Check',
      count: mcqs.length,
    },
    {
      id: 'code',
      label: 'Try With Code',
      count: codingQuestions.length,
    },
  ];

  // Dropdown for switching topics
  const allTopics = getAllTopics();
  const topicDropdownOptions = allTopics.map((t) => ({
    id: t.id,
    label: t.title,
  }));

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Breadcrumb & Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--neu-border)]">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--neu-text-muted)]">
          <Link to="/dashboard" className="hover:text-[var(--neu-text-primary)] transition-colors flex items-center gap-1">
            <span>←</span>
            <span>Dashboard</span>
          </Link>
          <span className="opacity-60">/</span>
          <span className="text-[var(--neu-accent)] font-semibold">{topicMeta.title}</span>
        </div>

        {/* Topic Switcher Dropdown */}
        <div className="flex items-center gap-3">
          <NeuDropdown
            labelPrefix="Topic: "
            options={topicDropdownOptions}
            selectedId={validTopicId}
            onChange={(newId) => navigate(`/topic/${newId}`)}
          />
        </div>
      </div>

      {/* Topic Hero Banner */}
      <div className="p-6 sm:p-8 rounded-2xl neu-raised flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--neu-accent)] font-semibold">
            Topic {topicMeta.order} of 4
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--neu-text-primary)] mt-1">
            {topicMeta.title}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--neu-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            {topicMeta.description}
          </p>
        </div>

        {/* Tab Switcher Segmented Control */}
        <div className="shrink-0">
          <NeuSegmented
            options={tabOptions}
            activeId={activeTab}
            onChange={(tab) => setActiveTab(tab)}
          />
        </div>
      </div>

      {/* Main Tab View */}
      <div className="min-h-[500px]">
        {activeTab === 'learn' && lesson && (
          <LearningArena
            lesson={lesson}
            topicId={validTopicId}
            onProgressUpdate={handleProgressUpdate}
          />
        )}

        {activeTab === 'mcq' && (
          <MCQCheck
            mcqs={mcqs}
            topicId={validTopicId}
            onScoreSaved={handleProgressUpdate}
          />
        )}

        {activeTab === 'code' && (
          <CodingArena
            questions={codingQuestions}
            topicId={validTopicId}
            onProblemSolved={handleProgressUpdate}
          />
        )}
      </div>
    </div>
  );
};
