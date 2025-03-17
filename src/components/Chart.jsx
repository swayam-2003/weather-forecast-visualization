import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useTheme } from "../utils/ThemeContext";

const Chart = ({ data }) => {
    const chartRef = useRef();
    const { darkMode } = useTheme();

    useEffect(() => {
        if (!data || data.length === 0) return;

        const margin = { top: 50, right: 30, bottom: 80, left: 60 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        d3.select(chartRef.current).selectAll("*").remove();

        const svg = d3
            .select(chartRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("background", darkMode ? "#1E1E1E" : "#F5F5F5")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.label))
            .range([0, width])
            .padding(0.4);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value)])
            .nice()
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("fill", darkMode ? "#fff" : "#333")
            .style("font-size", "14px");

        svg.append("g")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .attr("fill", darkMode ? "#fff" : "#333")
            .style("font-size", "14px");

        const bars = svg.selectAll(".bar").data(data).enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.label))
            .attr("y", (d) => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - y(d.value))
            .attr("fill", darkMode ? "#4A90E2" : "#007AFF");

        const tooltip = d3.select(chartRef.current).append("div")
            .style("position", "absolute")
            .style("background", "#333")
            .style("color", "#fff")
            .style("padding", "5px 10px")
            .style("border-radius", "5px")
            .style("visibility", "hidden");

        bars.on("mouseover", (event, d) => {
            tooltip.style("visibility", "visible")
                .text(`${d.label}: ${d.value}°C`);
        }).on("mousemove", (event) => {
            tooltip.style("top", `${event.pageY - 30}px`)
                .style("left", `${event.pageX + 10}px`);
        }).on("mouseout", () => {
            tooltip.style("visibility", "hidden");
        });

        const zoom = d3.zoom()
            .scaleExtent([1, 3])
            .translateExtent([[0, 0], [width, height]])
            .on("zoom", (event) => {
                svg.attr("transform", event.transform);
            });

        d3.select(chartRef.current).select("svg").call(zoom);

    }, [data, darkMode]);

    return <div ref={chartRef} />;
};

export default Chart;
