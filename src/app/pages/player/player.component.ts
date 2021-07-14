// src/app/pages/player/player.component.ts
// ... import statements and @Component declaration ...

import {Component} from '@angular/core';
import {MatSliderChange} from '@angular/material/slider';

import { AudioService } from '../../services/audio.service';
import { CloudService } from '../../services/cloud.service';
import { StreamState } from '../../interfaces/stream-state';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  files: Array<any> = [];
  state: StreamState | undefined;
  currentFile: any = {};

  constructor(
    public audioService: AudioService,
    public cloudService: CloudService
  ) {
    // get media files
    cloudService.getFiles().subscribe(files => {
      this.files = files;
    });

    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  isFirstPlaying(): boolean {
    return this.currentFile.index === 0;
  }
  isLastPlaying(): boolean {
    return this.currentFile.index === this.files.length - 1;
  }

  next(): void {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }
  pause(): void {
    this.audioService.pause();
  }
  play(): void {
    this.audioService.play();
  }
  previous(): void {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }
  stop(): void {
    this.audioService.stop();
  }

  onSliderChangeEnd(change: any): void {
    this.audioService.seekTo(change.value);
  }

  openFile(file: any, index: number): void{
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  playStream(url: string): void {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }
}
