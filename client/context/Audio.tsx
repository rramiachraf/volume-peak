import {
  createContext,
  useRef,
  useState,
  useEffect,
  MutableRefObject,
  Context,
  Dispatch,
  SetStateAction
} from 'react'

interface defaultValues {
  loop: boolean
  setLoop: Dispatch<SetStateAction<boolean>>
  playing: boolean
  setPlaying: Dispatch<SetStateAction<boolean>>
  setSrc: Dispatch<SetStateAction<string>>
  setArtwork: Dispatch<SetStateAction<string>>
  setArtist: Dispatch<SetStateAction<string>>
  setSongName: Dispatch<SetStateAction<string>>
  setDuration: Dispatch<SetStateAction<number>>
  mute: boolean
  currentTime: number
  togglePlay: () => void
  forward: () => void
  backward: () => void
  toggleMute: () => void
  toggleLoop: () => void
  audioRef: MutableRefObject<HTMLAudioElement>
  draggableWidth: string
  duration: number
  artwork: string
  artist: string
  songName: string
  src: string
}

export const AudioContext = createContext(null) as Context<defaultValues>

export const AudioProvider = ({ children }) => {
  const audioRef = useRef() as MutableRefObject<HTMLAudioElement>
  const [src, setSrc] = useState('')
  const [loop, setLoop] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [mute, setMute] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [draggableWidth, setDraggableWidth] = useState('0%')
  const [duration, setDuration] = useState(0)
  const [artwork, setArtwork] = useState('')
  const [artist, setArtist] = useState('')
  const [songName, setSongName] = useState('')

  useEffect(() => {
    const lastPlayedJSON = localStorage.getItem('last-played')
    if (lastPlayedJSON) {
      const lastPlayed = JSON.parse(lastPlayedJSON)
      setSrc(lastPlayed.trackURL)
      setDuration(lastPlayed.duration)
      setArtwork(lastPlayed.artworkURL)
      setArtist(lastPlayed.artist)
      setSongName(lastPlayed.name)
    }
    audioRef.current.addEventListener('play', () => {
      setPlaying(true)
    })
    audioRef.current.addEventListener('pause', () => {
      setPlaying(false)
    })
    audioRef.current.addEventListener('timeupdate', () => {
      setCurrentTime(audioRef.current.currentTime)
      setDraggableWidth(
        (audioRef.current.currentTime / audioRef.current.duration) * 100 + '%'
      )
    })
  }, [])

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  const forward = () => {
    audioRef.current.currentTime += 5
  }

  const backward = () => {
    audioRef.current.currentTime -= 5
  }

  const toggleMute = () => {
    if (audioRef.current.muted) {
      audioRef.current.muted = false
      setMute(false)
    } else {
      audioRef.current.muted = true
      setMute(true)
    }
  }

  const toggleLoop = () => {
    setLoop(!loop)
  }

  return (
    <AudioContext.Provider
      value={{
        loop,
        setLoop,
        playing,
        setPlaying,
        togglePlay,
        forward,
        backward,
        mute,
        toggleMute,
        currentTime,
        toggleLoop,
        audioRef,
        draggableWidth,
        duration,
        src,
        setSrc,
        setDuration,
        artwork,
        setArtwork,
        artist,
        setArtist,
        songName,
        setSongName
      }}
    >
      <audio ref={audioRef} src={src} loop={loop} hidden />
      {children}
    </AudioContext.Provider>
  )
}
