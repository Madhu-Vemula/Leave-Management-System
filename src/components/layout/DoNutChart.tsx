import { PieChart, Pie, Cell } from "recharts";
import { useState } from "react";
/** 
 * Renders a donut chart to visualize the number of paid and unpaid leaves.
 *
 * If no leaves are consumed, displays a single segment indicating no leaves taken.
 * Highlights segments on hover with a drop-shadow effect.
 * @component DonutChart
 * @param {DonutChartProps} props - Contains leave type data including paid and unpaid leaves.
 * @returns {React.JSX.Element} A styled donut chart component.
 */

export interface DonutDataItem {
    name: string;
    value: number;
    color?: string;
}

export interface DonutChartProps {
    data: DonutDataItem[];
    width?: number;
    height?: number;
    outerRadius?: number;
    innerRadius?: number;
}

const defaultColors = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a0522d", "#20b2aa", "#6a5acd"
];

const DonutChart: React.FC<DonutChartProps> = ({
    data,
    width = 400,
    height = 400,
    outerRadius = 135,
    innerRadius = 90,
}: DonutChartProps): React.JSX.Element => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const noData = data.every((d) => d.value === 0);
    const chartData = noData ? [{ name: "No data", value: 1 }] : data;

    const handleMouseEnter = (_: any, index: number): void => setActiveIndex(index);
    const handleMouseLeave = (): void => setActiveIndex(null);

    return (
        <PieChart width={width} height={height}>
            <Pie
                data={chartData}
                dataKey="value"
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                label={({ name, value }) =>
                    noData ? "No leaves consumed" : `${name}: ${value}`
                }
                labelLine={false}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                startAngle={90}
                endAngle={-270}
            >
                {chartData.map((entry, index) => {
                    const fillColor =
                        noData
                            ? "rgba(12, 169, 61, 0.8)"
                            : entry.color || defaultColors[index % defaultColors.length];

                    return (
                        <Cell
                            key={`cell-${index}`}
                            fill={fillColor}
                            style={{
                                filter:
                                    activeIndex === index
                                        ? `drop-shadow(0 0 8px ${fillColor})`
                                        : "none",
                                animation: activeIndex === index
                                    ? "blink 1s infinite alternate"
                                    : "none",
                            }}
                        />
                    );
                })}
            </Pie>
        </PieChart>
    );
};

export default DonutChart;
