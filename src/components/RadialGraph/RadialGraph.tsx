import { arc } from 'd3'
import { createMemo, For } from 'solid-js'
import { rawData } from '~/utils/audioSource'
import { Path, IRadialGraph } from '~/components/RadialGraph/types'

const arcBuilder = arc()

export const RadialGraph = ({ color, scale }: IRadialGraph) => {
    const computed = createMemo(() => {
        const data = rawData()

        const total = data.reduce((a, v) => a + v, 0)

        const hightCount = data.filter(d => d > 32).length
        const intensity = hightCount / data.length

        const paths: Path[] = []

        const range = 1.3 + intensity

        const rangeInRadians = range * Math.PI
        const startAngle = -(rangeInRadians / 2)
        let currentAngle = startAngle

        for (const d of data) {
            const notZeroD = d + 10
            const angle = rangeInRadians * (d / total)

            const path = arcBuilder({
                innerRadius: 50 - (notZeroD / 255) * 15,
                outerRadius: 50 + (notZeroD / 255) * 35,
                padAngle: 0.002,
                startAngle: currentAngle,
                endAngle: currentAngle + angle,
            })!

            paths.push({ path, color: color(d / 255) })

            currentAngle += angle
        }

        return { paths, intensity }
    })

    return (
        <g transform={`scale(${computed().intensity * scale + 1})`}>
            <For each={computed().paths}>
                {path => (
                    <path
                        d={path.path}
                        fill={path.color}
                    />
                )}
            </For>
        </g>
    )
}
