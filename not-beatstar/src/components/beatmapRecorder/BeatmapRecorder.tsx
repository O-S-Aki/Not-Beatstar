/*
import React from 'react'
import { useState, useEffect, useRef } from 'react';

import type { Song, Section, Note, RecorderState } from '../../lib/interfaces';
import { useBeatmapRecorder } from '../../hooks';

import './beatmapRecorder.css';

interface Props {
  song: Song
}

const BeatmapRecorder: React.FC<Props> = ({ song }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const engineRef = React.useRef<any>(null);

  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [recordedNotes, setRecordedNotes] = useState<Note[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [noteMode, setNoteMode] = useState<0 | 1 | 2>(0);

  const recorderState: RecorderState = useBeatmapRecorder({
    engine: engineRef.current,
    audio: audioRef.current!,
    sectionId: activeSection?.id ?? 0,
    startTimeMs: activeSection?.startTimeMs ?? 0,
    noteMode,
    onNoteAdded: (note) => setRecordedNotes(prev => [...prev, note])
  });

  useEffect(() => {
    setIsRecording(recorderState.isRecording);
  }, [recorderState.isRecording]);

  useEffect(() => {
    const audio: HTMLAudioElement | null = audioRef.current;
    
    if (!audio || !activeSection || !recorderState.isRecording) return;


  }, [recorderState.isRecording, activeSection])

  return (
    <div className="app-component editor-component">

    </div>
  )
}

export default BeatmapRecorder */

import { useState, useRef, useEffect } from 'react';

import { useBeatmapRecorder } from '../../hooks';
import type { Song, Section, Note } from '../../lib/interfaces';

import './beatmapRecorder.css';

interface Props {
  song: Song;
}

const BeatmapRecorder: React.FC<Props> = ({ song }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [allRecordedNotes, setAllRecordedNotes] = useState<Note[]>([]);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [noteMode, setNoteMode] = useState<0 | 1 | 2>(0);

  // update progress bar on a timer while recording
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activeSection) return;

    const id = setInterval(() => {
      const currentMs = audio.currentTime * 1000;
      const sectionDurationMs = activeSection.endTimeMs - activeSection.startTimeMs;
      const elapsed = currentMs - activeSection.startTimeMs;
      const pct = Math.min((elapsed / sectionDurationMs) * 100, 100);
      setProgressPercent(pct);
    }, 30);

    return () => clearInterval(id);
  }, [activeSection]);

  const { isRecording, recordedNotes, start, stop } = useBeatmapRecorder({
    audio: audioRef.current!,
    sectionId: activeSection?.id ?? 0,
    startTimeMs: activeSection?.startTimeMs ?? 0,
    noteMode,
    onNoteAdded: (note) => {
      setAllRecordedNotes(prev => [...prev, note]);
    },
  });

  const handleSectionSelect = (section: Section) => {
    // stop any current recording before switching
    if (isRecording) stop();

    setActiveSection(section);
    setAllRecordedNotes([]);
    setProgressPercent(0);

    const audio = audioRef.current!;
    audio.currentTime = section.startTimeMs / 1000;
  };

  const notesForActiveSection = allRecordedNotes.filter(
    n => n.sectionId === activeSection?.id
  );

  const sectionDurationMs = activeSection
    ? activeSection.endTimeMs - activeSection.startTimeMs
    : 1;

  return (
    <div className="beatmap-recorder">
      <audio ref={audioRef} src={song.uri} />

      {/* HEADER */}
      <div className="recorder-header">
        <h2 className="recorder-title">{song.artist} — {song.title}</h2>
        <p className="recorder-subtitle">Beatmap Recorder</p>
      </div>

      {/* SECTION PICKER */}
      <div className="recorder-section">
        <h4 className="recorder-section-label">Sections</h4>
        <div className="section-picker">
          {song.sections.map(section => (
            <button
              key={section.id}
              onClick={() => handleSectionSelect(section)}
              className={`section-btn ${activeSection?.id === section.id ? 'section-btn--active' : ''}`}
            >
              {section.description}
            </button>
          ))}
        </div>
      </div>

      {/* CONTROLS — only show when section is selected */}
      {activeSection && (
        <>
          {/* NOTE MODE */}
          <div className="recorder-section">
            <h4 className="recorder-section-label">Note Mode</h4>
            <div className="mode-picker">
              {([
                { label: 'Normal', value: 0 },
                { label: 'Double', value: 1 },
                { label: 'Checkpoint', value: 2 },
              ] as const).map(mode => (
                <button
                  key={mode.value}
                  onClick={() => setNoteMode(mode.value)}
                  className={`mode-btn mode-btn--${mode.label.toLowerCase()} ${noteMode === mode.value ? 'mode-btn--active' : ''}`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* RECORD BUTTON */}
          <div className="recorder-section">
            <button
              onClick={isRecording ? stop : start}
              className={`record-btn ${isRecording ? 'record-btn--stop' : 'record-btn--start'}`}
            >
              {isRecording ? '⏹ Stop' : '⏺ Record'}
            </button>
          </div>

          {/* PROGRESS BAR + NOTE MARKERS */}
          <div className="recorder-section">
            <h4 className="recorder-section-label">
              {activeSection.description} — {notesForActiveSection.length} notes
            </h4>

            <div className="timeline">
              {/* filled progress */}
              <div
                className="timeline-progress"
                style={{ width: `${progressPercent}%` }}
              />

              {/* playback cursor */}
              <div
                className="timeline-cursor"
                style={{ left: `${progressPercent}%` }}
              />

              {/* note markers */}
              {notesForActiveSection.map(note => {
                const relativePos =
                  (note.songTimeMs - activeSection.startTimeMs) / sectionDurationMs;

                const markerClass = note.isCheckpoint
                  ? 'marker--checkpoint'
                  : note.isHalf
                  ? 'marker--double'
                  : 'marker--normal';

                return (
                  <div
                    key={note.noteId}
                    className={`timeline-marker ${markerClass}`}
                    style={{ left: `${relativePos * 100}%` }}
                  />
                );
              })}
            </div>

            {/* LEGEND */}
            <div className="timeline-legend">
              <span className="legend-item legend-item--normal">Normal</span>
              <span className="legend-item legend-item--double">Double</span>
              <span className="legend-item legend-item--checkpoint">Checkpoint</span>
            </div>
          </div>

          {/* JSON OUTPUT */}
          <div className="recorder-section">
            <h4 className="recorder-section-label">Output JSON</h4>
            <pre className="json-output">
              {JSON.stringify(notesForActiveSection, null, 2)}
            </pre>
          </div>
        </>
      )}
    </div>
  );
};

export default BeatmapRecorder;
