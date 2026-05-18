import { useEffect, useState } from 'react';

const ROLES = [
  'Distributed Systems',
  'Real-Time Platforms',
  'Scalable Backend Systems',
  'Observability Engineering',
  'Full Stack Development'
];

const TYPE_SPEED = 110;       // ms per character while typing
const DELETE_SPEED = 55;      // ms per character while deleting
const PAUSE_AFTER_TYPE = 2000; // pause after word is fully typed
const PAUSE_AFTER_DELETE = 500; // pause before typing next word

export default function TypingAnimation() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [delta, setDelta] = useState(TYPE_SPEED);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];

    const ticker = setTimeout(() => {
      if (!isDeleting) {
        // Still typing
        const next = currentRole.slice(0, text.length + 1);
        setText(next);

        if (next === currentRole) {
          // Word complete — wait then start deleting
          setDelta(PAUSE_AFTER_TYPE);
          setIsDeleting(true);
        } else {
          setDelta(TYPE_SPEED);
        }
      } else {
        // Deleting
        const next = currentRole.slice(0, text.length - 1);
        setText(next);

        if (next === '') {
          // Fully deleted — move to next word
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          setDelta(PAUSE_AFTER_DELETE);
        } else {
          setDelta(DELETE_SPEED);
        }
      }
    }, delta);

    return () => clearTimeout(ticker);
  }, [text, isDeleting, roleIndex, delta]);

  return (
    <span className="inline-flex items-center">
      <span className="text-primary-400">{text}</span>
      <span
        className="ml-0.5 w-0.5 h-6 bg-primary-400 inline-block animate-blink"
        aria-hidden="true"
      />
    </span>
  );
}
