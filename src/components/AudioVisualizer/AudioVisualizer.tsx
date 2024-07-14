import { startFromFile } from '~/utils/audioSource'
import { RadialGraph } from '~/components/RadialGraph'
import { interpolateInferno, interpolateSinebow } from 'd3'
import styles from './AudioVisualizer.module.scss'

export const AudioVisualizer = () => {
    return (
        <article
            class={styles.container}
            onclick={startFromFile}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="-100 -120 200 200"
                preserveAspectRatio="xMidYMid meet"
            >
                <RadialGraph
                    color={interpolateSinebow}
                    scale={0.2}
                />
                <RadialGraph
                    color={interpolateInferno}
                    scale={0.3}
                />
            </svg>
        </article>
    )
}
