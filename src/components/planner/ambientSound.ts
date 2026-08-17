// Web Audio API Ambient Sound Generator for Focus Timer
export class AmbientSoundGenerator {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isPlaying: boolean = false;
  private currentType: string = "";

  start(type: "rain" | "forest" | "cafe" | "ocean" | "lofi"): boolean {
    if (this.isPlaying && this.currentType === type) {
      this.stop();
      return false;
    }
    this.stop();

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (type === "rain" || type === "ocean") {
          b0 = (b0 + (0.02 * white)) / 1.02;
          b1 = (b1 + (0.05 * white)) / 1.05;
          output[i] = (b0 + b1) * 3.5;
        } else if (type === "forest" || type === "lofi") {
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          output[i] = (b0 + b1 + b2 + b3) * 0.25;
        } else {
          output[i] = white * 0.3;
        }
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      this.filterNode = this.ctx.createBiquadFilter();
      if (type === "rain") {
        this.filterNode.type = "lowpass";
        this.filterNode.frequency.setValueAtTime(800, this.ctx.currentTime);
      } else if (type === "ocean") {
        this.filterNode.type = "bandpass";
        this.filterNode.frequency.setValueAtTime(400, this.ctx.currentTime);
        this.filterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);
      } else if (type === "forest") {
        this.filterNode.type = "highpass";
        this.filterNode.frequency.setValueAtTime(1200, this.ctx.currentTime);
      } else {
        this.filterNode.type = "lowpass";
        this.filterNode.frequency.setValueAtTime(1500, this.ctx.currentTime);
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.15, this.ctx.currentTime);

      whiteNoise.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      whiteNoise.start(0);
      this.noiseNode = whiteNoise;
      this.isPlaying = true;
      this.currentType = type;
      return true;
    } catch (e) {
      console.warn("AudioContext not supported or blocked", e);
      return false;
    }
  }

  stop(): void {
    if (this.noiseNode) {
      try {
        if (this.isPlaying) {
          (this.noiseNode as AudioBufferSourceNode).stop();
        }
        this.noiseNode.disconnect();
      } catch (e) {}
    }
    if (this.ctx && this.ctx.state !== "closed") {
      try {
        this.ctx.close();
      } catch (e) {}
    }
    this.ctx = null;
    this.noiseNode = null;
    this.gainNode = null;
    this.filterNode = null;
    this.isPlaying = false;
    this.currentType = "";
  }
}

export const audioGen = new AmbientSoundGenerator();
