import React, {useState, useEffect, useRef} from 'react'

export default function HomePage(props) {

    const {setFile, setAudioStream} = props

    const [recordingStatus, setRecordingStatus] = useState('inactive')
    const [audioChunks, setAudioChunks] = useState([])
    const [duration, setDuration] = useState(0)

    const mediaRecorder = useRef(null)

    const mimeType = 'audio/webm'

    useEffect(() => {
        if (recordingStatus === 'inactive') {return}

        //Updates the duration state every 1 second 
        const interval = setInterval(() => {
            setDuration(curr => curr + 1)
        }, 1000)

        return () => clearInterval(interval)
    })

    async function startRecording() {
        let tempStream 

        console.log('Start recording')

        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
            tempStream = streamData
        } catch (err) {
            console.log(err.message)
            return
        }
        setRecordingStatus('recording')

        //create new Media recorder instance using stream
        const media = new MediaRecorder(tempStream, {type: mimeType})
        mediaRecorder.current = media

        mediaRecorder.current.start()
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') {return}
            if (event.data.size === 0) {return}
            localAudioChunks.push(event.data)
        }

    }

    async function stopRecording() {
        setRecordingStatus('inactive')
        console.log('Stop Recording')

        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, {type: mimeType})
            setAudioStream(audioBlob)
            setAudioChunks([])
            setDuration(0)
        }
    }

    return (
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20'>
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>
                App 
                <span className='text-blue-400 bold'>
                    Scribe
                </span>
            </h1>

            <h3 className='font-medium md:text-lg'>
                Record 
                <span className='text-blue-400'>&rarr;</span>
                Transcribe
                <span className='text-blue-400'>&rarr;</span>
                Translate

            </h3>

            <button className='flex items-center text-base justify-between gap-4 mx-auto w-72 max-2-full my-4 specialBtn px-4 py-2 rounded-xl' 
                                onClick={recordingStatus === 'recording' ? stopRecording : startRecording}>
                <p className='text-blue-400'>
                    {recordingStatus === 'inactive' ? 'Record' : `Stop recording`}
                </p>
                <div className='flex items-center gap-3'>
                    {duration != 0 && (
                        <p className='text-sm'>{duration}s</p>
                    )
                        
                    }

                    <i className={"fa-solid duration-200 fa-microphone " + (recordingStatus==='recording' ? 'text-rose-300' : '')}></i>
                </div>
                
            </button>

            <p className='text-base'>
                Or 
                <label className='text-blue cursor-pointer hover:text-blue-400 duration-200'> upload <input className='hidden' type="file" accept='.mp3, .wave' 
                        onChange={(e)=> { 
                            const tempFile = e.target.files[0]
                            setFile(tempFile)
                            }} />
                </label>
                a mp3 file
            </p>

        </main>
    )
}
