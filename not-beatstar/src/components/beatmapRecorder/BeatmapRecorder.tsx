import { useState, useRef, useEffect } from 'react';

import { useBeatmapRecorder } from '../../hooks';
import { SectionSplitter } from '../';

import type { Song, Section, Note } from '../../lib/interfaces';

import './beatmapRecorder.css';

interface Props {
  song: Song;
}

function buildFinalBeatmap(
  sectionNotes: Record<number, Note[]>,
  sections: Section[]
): Note[] {
  return [...sections]
    .sort((a, b) => a.startTimeMs - b.startTimeMs)
    .flatMap(s =>
      (sectionNotes[s.id] ?? []).sort((a, b) => a.songTimeMs - b.songTimeMs)
    );
}

function buildSongJson(song: Song, sections: Section[], beatMap: Note[]): string {
  const out = {
    id: song.id,
    title: song.title,
    artist: song.artist,
    uri: song.uri,
    sections,
    pattern: beatMap,
  };
  return JSON.stringify(out, null, 2);
}

const BeatmapRecorder: React.FC<Props> = ({ song }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [songDurationMs, setSongDurationMs] = useState(0);
  const [sections, setSections] = useState<Section[]>(song.sections ?? []);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [sectionNotes, setSectionNotes] = useState<Record<number, Note[]>>({});
  const [progressPercent, setProgressPercent] = useState(0);

  // progress for recorder timeline
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activeSection) return;

    const id = setInterval(() => {
      const currentMs = audio.currentTime * 1000;
      const duration = activeSection.endTimeMs - activeSection.startTimeMs;
      const elapsed = currentMs - activeSection.startTimeMs;
      setProgressPercent(Math.min((elapsed / duration) * 100, 100));
    }, 30);

    return () => clearInterval(id);
  }, [activeSection]);

  const handleNoteAdded = (note: Note) => {
    setSectionNotes(prev => ({
      ...prev,
      [note.sectionId]: [...(prev[note.sectionId] ?? []), note],
    }));
  };

  const { isRecording, start, stop } = useBeatmapRecorder({
    audio: audioRef.current!,
    sectionId: activeSection?.id ?? 0,
    startTimeMs: activeSection?.startTimeMs ?? 0,
    noteMode: 0,
    onNoteAdded: handleNoteAdded,
  });

  const handleSectionSelect = (section: Section) => {
    if (isRecording) stop();
    setActiveSection(section);
    setProgressPercent(0);
    const audio = audioRef.current!;
    audio.currentTime = section.startTimeMs / 1000;
  };

  // when sections are redefined, clear orphaned recordings
  const handleSectionsChange = (updated: Section[]) => {
    setSections(updated);
    setActiveSection(null);
    setSectionNotes({});
    setProgressPercent(0);
  };

  const notesForActiveSection = activeSection
    ? (sectionNotes[activeSection.id] ?? [])
    : [];

  const sectionDurationMs = activeSection
    ? activeSection.endTimeMs - activeSection.startTimeMs
    : 1;

  const finalBeatmap = buildFinalBeatmap(sectionNotes, sections);
  const songJson = buildSongJson(song, sections, finalBeatmap);

  return (
    <div className="beatmap-recorder">

      {/* single audio element shared across both splitter and recorder */}
      <audio
        ref={audioRef}
        src={song.uri}
        onLoadedMetadata={() => {
          setSongDurationMs((audioRef.current?.duration ?? 0) * 1000);
        }}
      />

      {/* HEADER */}
      <div className="recorder-header">
        <h2 className="recorder-title">{song.artist} — {song.title}</h2>
        <p className="recorder-subtitle">Beatmap Recorder</p>
      </div>

      {/* SECTION SPLITTER */}
      <div className="recorder-panel">
        <SectionSplitter
          songUri={song.uri}
          songDurationMs={songDurationMs}
          sections={sections}
          onChange={handleSectionsChange}
        />
      </div>

      {/* SECTION PICKER */}
      {sections.length > 0 && (
        <div className="recorder-panel">
          <h4 className="recorder-panel-label">Record a Section</h4>
          <div className="section-picker">
            {[...sections]
              .sort((a, b) => a.startTimeMs - b.startTimeMs)
              .map(section => (
                <button
                  key={section.id}
                  onClick={() => handleSectionSelect(section)}
                  className={`section-btn ${activeSection?.id === section.id ? 'section-btn--active' : ''}`}
                >
                  {section.description}
                  {sectionNotes[section.id]?.length
                    ? ` (${sectionNotes[section.id].length})`
                    : ''}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* RECORDING */}
      {activeSection && (
        <>
          <div className="recorder-panel">
            <p className="recorder-key-hint">
              <kbd>A</kbd> / <kbd>S</kbd> → single note &nbsp;|&nbsp;
              <kbd>D</kbd> → double note
            </p>
            <button
              onClick={isRecording ? stop : start}
              className={`record-btn ${isRecording ? 'record-btn--stop' : 'record-btn--start'}`}
            >
              {isRecording ? '⏹ Stop' : '⏺ Record'}
            </button>
          </div>

          {/* SECTION TIMELINE */}
          <div className="recorder-panel">
            <h4 className="recorder-panel-label">
              {activeSection.description} — {notesForActiveSection.length} notes
            </h4>

            <div className="timeline">
              <div className="timeline-progress" style={{ width: `${progressPercent}%` }} />
              <div className="timeline-cursor" style={{ left: `${progressPercent}%` }} />

              {notesForActiveSection.map(note => {
                const rel =
                  (note.songTimeMs - activeSection.startTimeMs) / sectionDurationMs;
                return (
                  <div
                    key={`${note.sectionId}-${note.noteId}`}
                    className={`timeline-marker ${note.isHalf ? 'marker--double' : 'marker--normal'}`}
                    style={{ left: `${rel * 100}%` }}
                  />
                );
              })}
            </div>

            <div className="timeline-legend">
              <span className="legend-item legend-item--normal">Single</span>
              <span className="legend-item legend-item--double">Double</span>
            </div>
          </div>
        </>
      )}

      {/* FULL SONG JSON OUTPUT */}
      {finalBeatmap.length > 0 && (
        <div className="recorder-panel">
          <div className="json-output-header">
            <h4 className="recorder-panel-label">
              Song JSON — {finalBeatmap.length} notes total
            </h4>
            <button
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(songJson)}
            >
              Copy
            </button>
          </div>
          <pre className="json-output">
            {songJson}
          </pre>
        </div>
      )}
    </div>
  );
};

export default BeatmapRecorder;
