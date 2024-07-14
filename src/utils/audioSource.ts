import { createSignal } from 'solid-js'

const [rawData, setRawData] = createSignal<number[]>([])

export const startFromFile = async () => {
    const result = await fetch('/oppenHaimer.mp3')
    const byteArray = await result.arrayBuffer()

    const context = new AudioContext()
    const audioBuffer = await context.decodeAudioData(byteArray)

    const source = context.createBufferSource()
    source.buffer = audioBuffer

    const analyzer = context.createAnalyser()
    analyzer.fftSize = 512

    source.connect(analyzer)
    analyzer.connect(context.destination)

    source.start()

    const bufferLength = analyzer.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const update = () => {
        const original = Array.from(dataArray)

        analyzer.getByteFrequencyData(dataArray)
        setRawData([[...original].reverse(), ...original].flat())
        requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
}

export { rawData }
