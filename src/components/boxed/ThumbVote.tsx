"use client";
import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToastStore } from '@/app/store/ToastStore';
import type { getLikesResponse } from '@/app/api/utils/types/likes';

export type ThumbVoteProps = {
  id: number;
  likes: number;
  dislikes: number;
  hasStorageAccess: boolean;
  // Allow the component to update the parent's thumbs data optimistically
  setThumbsData: React.Dispatch<React.SetStateAction<getLikesResponse[]>>;
};

export const ThumbVote: React.FC<ThumbVoteProps> = ({ id, likes, dislikes, hasStorageAccess, setThumbsData }) => {
  const { t } = useTranslation();
  const { showToast } = useToastStore();

  const iconStyle = {
    cursor: hasStorageAccess ? 'pointer' : 'not-allowed',
    opacity: hasStorageAccess ? 1 : 0.5,
    color: hasStorageAccess ? 'inherit' : '#999'
  } as React.CSSProperties;

  const thumbsUp = async (voteId: number, type: 'like' | 'dislike') => {
    if (!hasStorageAccess) {
      showToast({
        type: 'error',
        title: t('error.cookie_title'),
        message: t('error.cookie_message')
      });
      return;
    }

    try {
      const VOTE_TTL = 24 * 60 * 60 * 1000; // 24 hours
      let votes: Record<string, { last: number; type: string }> = {};
      try {
        const raw = localStorage.getItem('thumbs_votes');
        if (raw) votes = JSON.parse(raw);
      } catch {
        votes = {};
      }

      const prev = votes[String(voteId)];
      if (prev && (Date.now() - prev.last) < VOTE_TTL) {
        showToast({ type: 'error', title: t('error.vote_limit_title'), message: t('error.vote_limit_message') });
        return;
      }

      // record the vote immediately to prevent rapid repeat clicks
      votes[String(voteId)] = { last: Date.now(), type };
      try { localStorage.setItem('thumbs_votes', JSON.stringify(votes)); } catch { /* ignore */ }

      // optimistic UI update
      setThumbsData(prev => prev.map((thumb, index) => index === voteId - 1 ? { ...thumb, data: { ...thumb.data, [type]: thumb.data[type] + 1 } } : thumb));
      showToast({ type });

      await axios.post('/api/mainpage/like', { id: voteId, type });
    } catch (err) {
      console.log(err);
      showToast({ type: 'error', title: t('error.request_failed_title'), message: t('error.request_failed_message') });
    }
  };

  return (
    <>
      <ThumbsUp
        onClick={() => thumbsUp(id, 'like')}
        style={iconStyle}
      />{' '}
      <span>[{likes}]</span>{' '}
      <ThumbsDown
        onClick={() => thumbsUp(id, 'dislike')}
        style={iconStyle}
      />{' '}
      <span>[{dislikes}]</span>
    </>
  );
};

export default ThumbVote;
