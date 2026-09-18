import React, { useState } from 'react';

interface LaurelProps {
  className?: string;
  imageSrc?: string;
}

const CANDIDATE_LAUREL_SOURCES = [
  '/images.png',
  '/guest-favorite.png',
  '/guest_favorite.png',
  '/laurel.png',
];

/**
 * Authentic Airbnb "Guest favourite" laurel branch icon
 * - LaurelBranchRight: uses /images.png (right side laurel branch)
 * - LaurelBranchLeft: mirrors /images.png with scale-x-[-1] (left side laurel branch)
 */
export const LaurelBranchLeft: React.FC<LaurelProps> = ({
  className = 'w-8 h-14',
  imageSrc,
}) => {
  const sources = imageSrc ? [imageSrc] : CANDIDATE_LAUREL_SOURCES;
  const [sourceIndex, setSourceIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const handleError = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  if (!allFailed && sources.length > 0) {
    return (
      <img
        src={sources[sourceIndex]}
        alt="Guest favourite laurel left"
        className={`${className} object-contain scale-x-[-1] shrink-0`}
        onError={handleError}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 100 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} scale-x-[-1] shrink-0`}
      aria-hidden="true"
    >
      <path
        d="M74 14C74 14 79 38 77 64C74 90 64 114 48 132C37 144 23 150 16 142C9 133 16 120 28 116C41 112 55 120 52 136"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M71 16C78 22 84 32 80 42C73 40 67 30 71 16Z"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      <path
        d="M76 45C86 52 92 64 87 75C78 73 72 61 76 45Z"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      <path
        d="M73 80C84 88 88 102 81 112C72 109 68 95 73 80Z"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      <path
        d="M58 110C68 118 70 132 60 140C52 135 51 122 58 110Z"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LaurelBranchRight: React.FC<LaurelProps> = ({
  className = 'w-8 h-14',
  imageSrc,
}) => {
  const sources = imageSrc ? [imageSrc] : CANDIDATE_LAUREL_SOURCES;
  const [sourceIndex, setSourceIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const handleError = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  if (!allFailed && sources.length > 0) {
    return (
      <img
        src={sources[sourceIndex]}
        alt="Guest favourite laurel right"
        className={`${className} object-contain shrink-0`}
        onError={handleError}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 100 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0`}
      aria-hidden="true"
    >
      <path
        d="M74 14C74 14 79 38 77 64C74 90 64 114 48 132C37 144 23 150 16 142C9 133 16 120 28 116C41 112 55 120 52 136"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M71 16C78 22 84 32 80 42C73 40 67 30 71 16Z"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      <path
        d="M76 45C86 52 92 64 87 75C78 73 72 61 76 45Z"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      <path
        d="M73 80C84 88 88 102 81 112C72 109 68 95 73 80Z"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      <path
        d="M58 110C68 118 70 132 60 140C52 135 51 122 58 110Z"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinejoin="round"
      />
    </svg>
  );
};
