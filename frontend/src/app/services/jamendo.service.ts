import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicApiService {
  // Base URL for the Jamendo API.
  private API_BASE = 'https://api.jamendo.com/v3.0';
  // Client ID for authenticating requests to the Jamendo API.
  private CLIENT_ID = 'ba08b20a';
  // Inject HttpClient for making HTTP requests.
  constructor(private http: HttpClient) {}
  /**
   * Fetches a list of tracks from the Jamendo API.
   * @param {number} limit - The maximum number of tracks to fetch (default is 50).
   * @returns {Promise<any[]>} - A promise resolving to an array of track objects.
   */
  async fetchTracks(limit = 50): Promise<any[]> {
    // Construct the API URL with query parameters.
    const response = await fetch(
      `${this.API_BASE}/tracks/?client_id=${this.CLIENT_ID}&format=json&limit=${limit}&include=musicinfo&audioformat=mp32`
    );

    // Check if the response is successful.
    if (!response.ok) {
      throw new Error('Failed to fetch tracks from Jamendo');
    }

    // Parse the response JSON.
    const data = await response.json();

    // Map the API response to a simplified track object structure.
    return data.results.map((track: any) => ({
      id: track.id,
      name: track.name,
      duration: track.duration,
      artist_name: track.artist_name,
      album_name: track.album_name,
      image: track.album_image,
      audio: track.audio,
    }));
  }
}
