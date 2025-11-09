using System;

namespace API.Model
{
    public class Recordings
    {
        // Corresponds to IdRecording (Primary Key)
        public int IdRecording { get; set; }

        // Corresponds to IdLead (Foreign Key to Leads)
        public int IdLead { get; set; }

        // Corresponds to Title
        public string? Title { get; set; }

        // Corresponds to Duration
        public string? Duration { get; set; }

        // Corresponds to Status (e.g., "processing", "processed")
        public string? Status { get; set; }

        // Corresponds to Source (e.g., "call", "voice note")
        public string? Source { get; set; }

        // Corresponds to FilePath (URL or path to audio)
        public string? FilePath { get; set; }

        // Corresponds to Transcription (the text from the audio)
        public string? Transcription { get; set; }

        // Corresponds to Created_At
        public DateTime Created_At { get; set; }

        // Corresponds to Updated_At
        public DateTime Updated_At { get; set; }

        // Empty constructor, matching the pattern from Leads.cs
        public Recordings()
        {
        }
    }
}