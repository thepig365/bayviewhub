export const PRIMARY_AUDIO_TRANSCRIPTION_MAX_BYTES = 24 * 1024 * 1024
export const PRIMARY_AUDIO_TRANSCRIPTION_MAX_MB = Math.round(
  PRIMARY_AUDIO_TRANSCRIPTION_MAX_BYTES / (1024 * 1024)
)

export const PRIMARY_AUDIO_UPLOAD_COPY = `MP3, M4A, WAV, OGG, or WebM up to ${PRIMARY_AUDIO_TRANSCRIPTION_MAX_MB} MB for transcript generation`

export function exceedsPrimaryAudioTranscriptionLimit(file: Pick<File, 'size'>): boolean {
  return file.size > PRIMARY_AUDIO_TRANSCRIPTION_MAX_BYTES
}

export function primaryAudioTranscriptionLimitMessage(): string {
  return `Audio transcription currently supports files up to ${PRIMARY_AUDIO_TRANSCRIPTION_MAX_MB} MB. Please trim or compress the recording, then try again.`
}
