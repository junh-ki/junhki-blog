import { JSX, useState } from 'react';

type Props = {
  tags: string[];
  maxVisible?: number;
};

export default function TagList({ tags, maxVisible = 5 }: Props): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? tags : tags.slice(0, maxVisible);
  const hiddenCount = tags.length - maxVisible;

  return (
    <div className="d-flex flex-wrap gap-1 align-items-center">
      {visible.map((tag) => (
        <span key={tag} className="badge rounded-pill text-bg-light border">
          {tag}
        </span>
      ))}
      {!expanded && hiddenCount > 0 && (
        <button
          className="badge rounded-pill border bg-transparent text-secondary"
          style={{ cursor: 'pointer', fontSize: '0.75rem' }}
          onClick={() => setExpanded(true)}
        >
          +{hiddenCount} more
        </button>
      )}
      {expanded && hiddenCount > 0 && (
        <button
          className="badge rounded-pill border bg-transparent text-secondary"
          style={{ cursor: 'pointer', fontSize: '0.75rem' }}
          onClick={() => setExpanded(false)}
        >
          Show less
        </button>
      )}
    </div>
  );
}
