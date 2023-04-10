import React, { useState, useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';

const Bar = styled.span`
  &:after {
    content: '|';
    animation: blink 0.75s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    font-family: auto;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

type TextAnimationProps = {
  phrases: string[];
  typingSpeed: number;
  backspaceDelay: number;
  eraseDelay: number;
  timeComplete?: number;
  errorProbability: number;
  isSecure?: boolean;
  eraseOnComplete?: boolean;
};

const TextAnimation = ({
  phrases,
  typingSpeed,
  backspaceDelay,
  eraseDelay,
  errorProbability,
  timeComplete = 3000,
  isSecure = true,
  eraseOnComplete = true,
}: TextAnimationProps) => {
  const [text, setText] = useState('');
  const [changePhrase, setChangePhrase] = useState(1);
  const [phraseId, setPhraseId] = useState(0);

  const onPhraseComplete = () => {
    if (!eraseOnComplete) return;
    setTimeout(async () => {
      await eraseText();
      setTimeout(() => {
        setChangePhrase(changePhrase + 1);
        setPhraseId(phraseId === phrases.length - 1 ? 0 : phraseId + 1);
      }, eraseDelay);
    }, timeComplete);
  };

  const eraseText = () => {
    return new Promise<void>((resolve) => {
      let count = phrases[phraseId].length;
      const timer = setInterval(() => {
        setText(phrases[phraseId].slice(0, count));
        count--;
        if (count < 0) {
          clearInterval(timer);
          resolve();
        }
      }, backspaceDelay);
    });
  };

  useEffect(() => {
    let count = 0;
    let timer: any;

    const getRandomTimeout = () => {
      const lambda = 1 / typingSpeed;
      const randomValue = Math.random();
      const timeout = -Math.log(1 - randomValue) / lambda;
      return Math.min(timeout, 200);
    };

    const animateText = () => {
      const shouldBackspace = Math.random() < errorProbability && count > 0;
      if (shouldBackspace) {
        count--;
      } else {
        setText(phrases[phraseId].slice(0, count));
        count++;
      }
      if (count === phrases[phraseId].length + 1) {
        onPhraseComplete();
        clearInterval(timer);
      } else {
        const timeout = getRandomTimeout();
        timer = setTimeout(animateText, timeout);
      }
    };

    timer = setTimeout(animateText, 100);
    return () => clearTimeout(timer);
  }, [changePhrase]);

  return (
    <Bar
      style={{ fontFamily: 'inherit' }}
      dangerouslySetInnerHTML={{
        __html: isSecure ? sanitizeHtml(text) : text,
      }}
    />
  );
};

export default TextAnimation;