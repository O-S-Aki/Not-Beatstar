import { useRef, useState, useEffect } from 'react';
import type { Section } from '../../lib/interfaces';
import './sectionSplitter.css';

interface Props {
  songUri: string;
  songDurationMs: number;
  sections: Section[];
  onChange: (sections: Section[]) => void;
}

const SectionSplitter: React.FC<Props> = ({ songUri, songDurationMs, sections, onChange }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const chopMarkersRef = useRef<number[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [chopMarkers, setChopMarkers] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  // keep ref in sync for use inside event handlers
  useEffect(() => {
    chopMarkersRef.current = chopMarkers;
  }, [chopMarkers]);

  // progress ticker
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const id = setInterval(() => {
      if (!audio.paused) {
        setProgressPercent((audio.currentTime * 1000 / songDurationMs) * 100);
      }
    }, 30);

    return () => clearInterval(id);
  }, [songDurationMs]);

  // spacebar chop — reads from ref so it's never stale
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;
      e.preventDefault();

      const audio = audioRef.current;
      if (!audio || audio.paused) return;

      const markerMs = Math.round(audio.currentTime * 1000);
      const updated = [...chopMarkersRef.current, markerMs].sort((a, b) => a - b);

      chopMarkersRef.current = updated;
      setChopMarkers(updated);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // auto stop when song ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnd = () => {
      setIsPlaying(false);
      buildSections(chopMarkersRef.current);
    };

    audio.addEventListener('ended', onEnd);
    return () => audio.removeEventListener('ended', onEnd);
  }, [songDurationMs]);

  const buildSections = (markers: number[]) => {
    const boundaries = [0, ...markers, songDurationMs];

    const built: Section[] = boundaries.slice(0, -1).map((start, i) => ({
      id: i,
      startTimeMs: start,
      endTimeMs: boundaries[i + 1],
      description: sections[i]?.description ?? `section-${i}`,
    }));

    onChange(built);
  };

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
    setChopMarkers([]);
    chopMarkersRef.current = [];
    onChange([]);
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    buildSections(chopMarkersRef.current);
  };

  const removeMarker = (ms: number) => {
    const updated = chopMarkersRef.current.filter(m => m !== ms);
    chopMarkersRef.current = updated;
    setChopMarkers(updated);
    buildSections(updated);
  };

  const startRename = (section: Section) => {
    setEditingId(section.id);
    setEditingName(section.description ?? '');
  };

  const commitRename = () => {
    if (editingId === null) return;
    const updated = sections.map(s =>
      s.id === editingId ? { ...s, description: editingName } : s
    );
    onChange(updated);
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className="section-splitter">
      <audio ref={audioRef} src={songUri} />

      <h4 className="splitter-label">Section Splitter</h4>
      <p className="splitter-hint">
        Press <kbd>Play</kbd> then hit <kbd>Space</kbd> wherever you want a section break.
        Click a marker to remove it.
      </p>

      <div className="splitter-transport">
        {!isPlaying ? (
          <button className="transport-btn transport-btn--play" onClick={play}>
            ▶ Play
          </button>
        ) : (
          <button className="transport-btn transport-btn--stop" onClick={stop}>
            ⏹ Stop & Slice
          </button>
        )}
      </div>

      {(isPlaying || sections.length > 0) && (
        <div className="splitter-timeline-wrapper">
          <div className="splitter-timeline">

            <div
              className="splitter-progress"
              style={{ width: `${progressPercent}%` }}
            />

            {isPlaying && (
              <div
                className="splitter-cursor"
                style={{ left: `${progressPercent}%` }}
              />
            )}

            {chopMarkers.map(ms => {
              const pct = (ms / songDurationMs) * 100;
              return (
                <button
                  key={ms}
                  className="splitter-marker"
                  style={{ left: `${pct}%` }}
                  onClick={() => !isPlaying && removeMarker(ms)}
                  title={`${(ms / 1000).toFixed(2)}s — click to remove`}
                />
              );
            })}

            {sections.map(s => {
              const midPct =
                ((s.startTimeMs + (s.endTimeMs - s.startTimeMs) / 2) /
                  songDurationMs) * 100;
              return (
                <span
                  key={s.id}
                  className="splitter-section-label"
                  style={{ left: `${midPct}%` }}
                >
                  {s.description}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {sections.length > 0 && (
        <div className="splitter-section-list">
          {sections.map(s => (
            <div key={s.id} className="splitter-section-item">

              {editingId === s.id ? (
                <input
                  className="splitter-rename-input"
                  value={editingName}
                  autoFocus
                  onChange={e => setEditingName(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={e => e.key === 'Enter' && commitRename()}
                />
              ) : (
                <button
                  className="splitter-section-name"
                  onClick={() => startRename(s)}
                >
                  ✎ {s.description}
                </button>
              )}

              <span className="splitter-section-time">
                {(s.startTimeMs / 1000).toFixed(2)}s → {(s.endTimeMs / 1000).toFixed(2)}s
              </span>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionSplitter;
