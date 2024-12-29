import { Component, OnInit } from '@angular/core';
import { MusicApiService } from '../services/jamendo.service';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common'; // Modules for iterating and conditionally rendering
import { FormsModule } from '@angular/forms'; // Importing FormsModule for two-way data binding

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule], // Standalone component with necessary imports
  styleUrls: ['./music.component.css'] // Component's style
})
export class MusicComponent implements OnInit {
  tracks: any[] = [];  // Array to hold the list of tracks fetched from the API
  filteredTracks: any[] = [];  // Array to hold the filtered tracks based on search
  errorMessage: string | null = null; // Error message in case of failed track load

  currentTrack: any = null;  // Object to hold the currently playing track
  currentTrackIndex: number = 0;  // Index of the current track
  audio = new Audio();  // Audio object for playing the track
  isPlaying = false;  // Flag to check if a track is currently playing
  volume = 0.5;  // Default volume setting (50%)

  searchQuery: string = ''; // Variable for searching tracks by name
  playlists: any[] = []; // Array to hold created playlists

  constructor(private musicApiService: MusicApiService) {}

  ngOnInit(): void {
    // Fetch top tracks when the component is initialized
    this.fetchTopTracks();
    this.audio.volume = this.volume; // Set initial volume level for the audio
  }

  // Function to fetch top tracks from the API
  async fetchTopTracks(): Promise<void> {
    try {
      this.tracks = await this.musicApiService.fetchTracks(50);  // Fetch 50 tracks
      this.filteredTracks = this.tracks; // Initialize the filtered tracks with all fetched tracks
    } catch (error) {
      this.errorMessage = 'Failed to load music tracks.';  // Set error message if the fetch fails
      console.error(error);  // Log the error for debugging
    }
  }

  // Search function to filter tracks by name
  searchTracks(): void {
    // Filter tracks based on the search query, case-insensitive
    this.filteredTracks = this.tracks.filter(track =>
      track.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Play the selected track from the list or playlist
  playTrack(track: any, index: number): void {
    // If the same track is clicked and already playing, pause it
    if (this.currentTrack?.id === track.id && this.isPlaying) {
      this.togglePlay();
      return;
    }

    // Set current track and update audio source
    this.currentTrack = track;
    this.currentTrackIndex = index;
    this.audio.src = track.audio;
    this.audio.play();  // Start playing the selected track
    this.isPlaying = true;  // Set playing flag to true
  }

  // Toggle play/pause functionality
  togglePlay(): void {
    // If the track is playing, pause it, else play it
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;  // Toggle the isPlaying flag
  }

  // Play the next track in the list
  nextTrack(): void {
    if (this.currentTrackIndex < this.tracks.length - 1) {
      // If there is a next track, play it
      this.playTrack(this.tracks[this.currentTrackIndex + 1], this.currentTrackIndex + 1);
    }
  }

  // Play the previous track in the list
  prevTrack(): void {
    if (this.currentTrackIndex > 0) {
      // If there is a previous track, play it
      this.playTrack(this.tracks[this.currentTrackIndex - 1], this.currentTrackIndex - 1);
    }
  }

  // Adjust the volume of the audio
  adjustVolume(): void {
    this.audio.volume = this.volume;  // Set the volume of the audio element
  }

  // Create a new playlist
  createPlaylist(): void {
    const playlistName = prompt('Enter playlist name:');  // Prompt user for playlist name
    if (playlistName) {
      this.playlists.push({ name: playlistName, tracks: [] });  // Add new playlist to the playlists array
      alert('Playlist created!');  // Notify user that the playlist was created
    }
  }

  // Add a track to a selected playlist
  selectPlaylist(event: any, track: any): void {
    const playlistName = event.target.value;  // Get the playlist name from the dropdown
    if (playlistName) {
      const playlist = this.playlists.find(p => p.name === playlistName);  // Find the playlist by name
      if (playlist) {
        playlist.tracks.push(track);  // Add track to the selected playlist
        alert(`${track.name} added to ${playlistName}`);  // Notify the user
      }
    }
  }
}
