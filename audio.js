/**
 * Web Audio API Procedural Sound Engine
 * Generates romantic background chimes & celebratory sound effects
 * Zero external audio dependencies = 100% reliable offline & instant load!
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.isMuted = true;
    this.musicTimer = null;
    this.currentTheme = 'sunset';
    
    // Romantic Pentatonic Chord Progressions (Acoustic Bell / Harp Timbre)
    // C Major / A Minor Pentatonic & Lydian frequencies
    this.melodyChords = [
      [261.63, 329.63, 392.00, 523.25, 659.25], // C Major
      [220.00, 261.63, 329.63, 440.00, 523.25], // A Minor
      [349.23, 440.00, 523.25, 659.25, 698.46], // F Major 7
      [392.00, 493.88, 587.33, 783.99, 987.77]  // G Major
    ];
    this.chordIndex = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Romantic acoustic chime note with reverb & gentle decay
  playChime(freq, time = 0, duration = 1.6, gainLevel = 0.15) {
    if (this.isMuted || !this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft triangle/sine blend for warm harp/chime feel
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + time);

      // Lowpass filter for smooth romantic warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime + time);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + time + duration);

      // Amplitude Envelope (quick attack, long soft decay)
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(gainLevel, this.ctx.currentTime + time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + time);
      osc.stop(this.ctx.currentTime + time + duration + 0.1);
    } catch (e) {
      // Audio fallback quiet
    }
  }

  // Celebratory Gift Box Opening Fanfare Chimes
  playGiftOpenFanfare() {
    this.init();
    if (this.isMuted) return;

    const notes = [
      { f: 523.25, t: 0.0, d: 0.8 }, // C5
      { f: 659.25, t: 0.12, d: 0.9 }, // E5
      { f: 783.99, t: 0.24, d: 1.0 }, // G5
      { f: 1046.50, t: 0.36, d: 1.8 }, // C6 (glowing high note)
      { f: 1318.51, t: 0.48, d: 2.2 }  // E6 shimmer
    ];

    notes.forEach(n => this.playChime(n.f, n.t, n.d, 0.2));
  }

  // Magical Sparkle on Click / Fireworks
  playSparkleSound() {
    this.init();
    if (this.isMuted) return;

    const baseF = 800 + Math.random() * 600;
    for (let i = 0; i < 4; i++) {
      const f = baseF * Math.pow(1.25, i);
      this.playChime(f, i * 0.04, 0.5, 0.08);
    }
  }

  // Cute frog "ribbit": two short buzzy chirps with a fast flutter
  playCroak() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    try {
      [0, 0.17].forEach(offset => {
        const t = this.ctx.currentTime + offset;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const flutter = this.ctx.createGain();
        const flutterLfo = this.ctx.createOscillator();
        const flutterDepth = this.ctx.createGain();
        const envelope = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(230, t);
        osc.frequency.exponentialRampToValueAtTime(150, t + 0.12);

        filter.type = 'bandpass';
        filter.frequency.value = 850;
        filter.Q.value = 2.5;

        // Gain swings between 0 and 1 about 38 times a second for the throaty "rrr"
        flutter.gain.value = 0.5;
        flutterLfo.frequency.value = 38;
        flutterDepth.gain.value = 0.5;
        flutterLfo.connect(flutterDepth);
        flutterDepth.connect(flutter.gain);

        envelope.gain.setValueAtTime(0.0001, t);
        envelope.gain.exponentialRampToValueAtTime(0.12, t + 0.015);
        envelope.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);

        osc.connect(filter);
        filter.connect(flutter);
        flutter.connect(envelope);
        envelope.connect(this.ctx.destination);

        osc.start(t);
        flutterLfo.start(t);
        osc.stop(t + 0.15);
        flutterLfo.stop(t + 0.15);
      });
    } catch (e) {
      // Audio fallback quiet
    }
  }

  // Soft Button Tap Feedback
  playTapSound() {
    this.init();
    if (this.isMuted) return;
    this.playChime(784, 0, 0.2, 0.05);
  }

  // Toggle Continuous Ambient Romantic Melody
  toggleBackgroundMusic() {
    this.init();
    if (this.isPlayingMusic) {
      this.stopBackgroundMusic();
      return false;
    } else {
      this.isMuted = false;
      this.startBackgroundMusic();
      return true;
    }
  }

  startBackgroundMusic() {
    this.isPlayingMusic = true;
    this.isMuted = false;

    const playArpeggioStep = () => {
      if (!this.isPlayingMusic) return;

      const currentChord = this.melodyChords[this.chordIndex];
      // Pick 3-4 soft arpeggiated notes
      currentChord.forEach((freq, idx) => {
        const offset = idx * 0.28 + (Math.random() * 0.05);
        this.playChime(freq, offset, 2.2, 0.06);
      });

      this.chordIndex = (this.chordIndex + 1) % this.melodyChords.length;

      // Next chord in 2.4 seconds
      this.musicTimer = setTimeout(playArpeggioStep, 2200);
    };

    playArpeggioStep();
  }

  stopBackgroundMusic() {
    this.isPlayingMusic = false;
    this.isMuted = true;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

window.soundEngine = new SoundEngine();
