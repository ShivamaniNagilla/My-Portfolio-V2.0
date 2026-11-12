/**
 * Web Audio API Ambient Space Synthesizer
 * Generates an Interstellar-inspired deep cosmic drone and solar wind shimmer
 * 100% procedural with zero external audio assets.
 */

class SpaceAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private isPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Master Gain with smooth fade-in
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.18, now + 2.5);
      this.masterGain.connect(this.ctx.destination);

      // Low-pass filter for deep space warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);
      filter.Q.setValueAtTime(2.5, now);
      filter.connect(this.masterGain);

      // Sub-bass drone (55 Hz - A1 note)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(55, now);

      // Harmonic drone (82.4 Hz - E2 fifth)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(82.4, now);

      // Gentle LFO for deep gravitational pulsating breathing effect
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15, now); // Slow 6.6-second breathing cycle
      lfoGain.gain.setValueAtTime(25, now);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);

      const droneMix = this.ctx.createGain();
      droneMix.gain.setValueAtTime(0.6, now);
      this.osc1.connect(droneMix);
      this.osc2.connect(droneMix);
      droneMix.connect(filter);

      // Procedural Cosmic Dust / Solar Wind Noise
      const bufferSize = this.ctx.sampleRate * 4;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02; // Pink noise curve
        lastOut = output[i];
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(450, now);
      noiseFilter.Q.setValueAtTime(4.0, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      this.osc1.start(now);
      this.osc2.start(now);
      this.noiseNode.start(now);

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    try {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.noiseNode?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.noiseNode?.disconnect();
          this.isPlaying = false;
        } catch {
          this.isPlaying = false;
        }
      }, 1250);
    } catch {
      this.isPlaying = false;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const spaceAudio = new SpaceAudioSynthesizer();
