import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopicMeta, TopicStatus } from '../../types';
import { NeuCard } from '../common/NeuCard';
import { NeuBadge } from '../common/NeuBadge';
import { NeuProgressBar } from '../common/NeuProgressBar';

interface TopicCardProps {
  topic: TopicMeta;
  lessonsDone: number;
  totalLessons: number;
  mcqBestScore: number;
  mcqTotal: number;
  codingSolved: number;
  codingTotal: number;
  status: TopicStatus;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  lessonsDone,
  totalLessons,
  mcqBestScore,
  mcqTotal,
  codingSolved,
  codingTotal,
  status,
}) => {
  const navigate = useNavigate();

  const statusBadge = {
    not_started: <NeuBadge variant="default">Not Started</NeuBadge>,
    in_progress: <NeuBadge variant="orange">In Progress</NeuBadge>,
    mastered: <NeuBadge variant="green">Mastered</NeuBadge>,
  }[status];

  // Overall topic completion %
  const totalWeight = totalLessons + mcqTotal + codingTotal;
  const earnedWeight = lessonsDone + mcqBestScore + codingSolved;
  const topicPct = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

  return (
    <NeuCard
      hoverable
      active={status === 'in_progress'}
      onClick={() => navigate(`/topic/${topic.id}`)}
      className="flex flex-col justify-between h-full p-6 group"
    >
      <div>
        {/* Header: Topic number + Title + Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center shrink-0 font-mono font-bold text-sm text-[var(--neu-accent)]">
            0{topic.order}
          </div>
          <div className="shrink-0">{statusBadge}</div>
        </div>

        <h3 className="text-lg font-bold text-[var(--neu-text-primary)] group-hover:text-[var(--neu-accent)] transition-colors mb-1.5">
          {topic.title}
        </h3>
        <p className="text-xs text-[var(--neu-text-secondary)] leading-relaxed mb-5 line-clamp-2">
          {topic.description}
        </p>

        {/* 3 Pillar Stats */}
        <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl neu-inset mb-5">
          <div className="text-center">
            <div className="text-[10px] text-[var(--neu-text-muted)] font-mono uppercase tracking-wider mb-0.5">
              Lessons
            </div>
            <span className="text-xs sm:text-sm font-bold font-mono text-[var(--neu-text-primary)]">
              {lessonsDone}/{totalLessons}
            </span>
          </div>

          <div className="text-center border-x border-[var(--neu-border)]">
            <div className="text-[10px] text-[var(--neu-text-muted)] font-mono uppercase tracking-wider mb-0.5">
              MCQs
            </div>
            <span className="text-xs sm:text-sm font-bold font-mono text-[var(--neu-text-primary)]">
              {mcqBestScore}/{mcqTotal}
            </span>
          </div>

          <div className="text-center">
            <div className="text-[10px] text-[var(--neu-text-muted)] font-mono uppercase tracking-wider mb-0.5">
              Coding
            </div>
            <span className="text-xs sm:text-sm font-bold font-mono text-[var(--neu-text-primary)]">
              {codingSolved}/{codingTotal}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <NeuProgressBar
          value={topicPct}
          height="sm"
          label="Topic Completion"
          showPercent
        />
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-[var(--neu-border)] flex items-center justify-between text-xs font-semibold text-[var(--neu-accent)]">
        <span>Enter Topic Arena</span>
        <span className="font-mono text-xs">→</span>
      </div>
    </NeuCard>
  );
};
