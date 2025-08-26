import { ResponsiveBar } from '@nivo/bar';
import { linearGradientDef } from '@nivo/core';
import { useRef, useState, useMemo } from 'react';
import type { BarTooltipProps } from '@nivo/bar';
interface ChartData {
  regra: string;
  valor: number;
  [key: string]: string | number;
}

export default function BarChart() {
    const data: ChartData[] = useMemo(() => [
      { "regra": "Lei 1", "valor": 10 },
      { "regra": "Lei 2", "valor": 50 },
      { "regra": "Lei 3", "valor": 20 },
      { "regra": "Lei 4", "valor": 20 },
      { "regra": "Lei 5", "valor": 20 },
      { "regra": "Lei 6", "valor": 20 },
      { "regra": "Lei 7", "valor": 20 },
      { "regra": "Lei 8", "valor": 20 },
      { "regra": "Lei 9", "valor": 10 },
      { "regra": "Lei 10", "valor": 50 },
      { "regra": "Lei 11", "valor": 70 },
      { "regra": "Lei 12", "valor": 20 },
      { "regra": "Lei 13", "valor": 20 },
      { "regra": "Lei 14", "valor": 20 },
      { "regra": "Lei 15", "valor": 20 },
      { "regra": "Lei 16", "valor": 20 },
      { "regra": "Lei 17", "valor": 20 },
      { "regra": "Lei 18", "valor": 20 },
      { "regra": "Lei 19", "valor": 10 },
      { "regra": "Lei 20", "valor": 50 },
      { "regra": "Lei 21", "valor": 20 },
      { "regra": "Lei 22", "valor": 20 },
      { "regra": "Lei 23", "valor": 20 },
      { "regra": "Lei 24", "valor": 20 },
      { "regra": "Lei 25", "valor": 20 },
      { "regra": "Lei 26", "valor": 20 },
      { "regra": "Lei 27", "valor": 20 },
      { "regra": "Lei 28", "valor": 20 },
      { "regra": "Lei 29", "valor": 10 },
    ], []);

    const theme = {
      axis: {
        domain: { line: { stroke: 'white' } },
        ticks: { line: { stroke: 'white' }, text: { fill: 'white', fontSize: '10px' } },
        legend: { text: { fill: 'white' } },
      },
      grid: { line: { stroke: 'white', strokeDasharray: '4 4' } },
      tooltip: { container: { background: '#003366', color: 'white' } },
      labels: { text: { fill: '#333333', fontSize: '14px', fontWeight: 'bold' } }
    };
    
    const totalValue = useMemo(() => data.reduce((sum, d) => sum + d.valor, 0), [data]);
    
    const CustomTooltip = ({ value, indexValue }: BarTooltipProps<ChartData>) => {
      const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : 0;
      return (
        <div style={{ padding: '8px', background: '#003366', color: 'white', borderRadius: '4px', boxShadow: '0px 2px 5px rgba(0,0,0,0.2)' }}>
          <strong>Cenário:</strong> {indexValue}
          <br />
          <strong>Registros:</strong> {value}
          <br />
          <strong>Representatividade:</strong> {percentage}%
        </div>
      );
    };

    const minWidth = data.length * 60;
    
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
      setScrollLeft(scrollContainerRef.current!.scrollLeft);
    };

    const onMouseLeave = () => {
      setIsDragging(false);
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !scrollContainerRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
      <>
        <div id="summary-cards">
          <div className="summary-card">
            <h2>Total de Registros</h2>
            <p>{totalValue}</p>
          </div>
          <div className="summary-card">
            <h2>Cenários Identificados</h2>
            <p>{data.length}</p>
          </div>
          <div className="summary-card">
            <h2>Data da Análise</h2>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div id="chart-container">
          <div 
            ref={scrollContainerRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            style={{
              width: '100%',
              height: '500px',
              overflowX: 'auto',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            <div style={{ width: '100%', height: '100%', minWidth: `${minWidth}px` }}>
              <ResponsiveBar
                data={data}
                theme={theme}
                indexBy="regra"
                keys={["valor"]}
                layout="vertical"
                enableGridX={false}
                enableGridY={true}
                labelSkipWidth={12}
                labelTextColor="black"
                tooltip={CustomTooltip}
                defs={[
                  linearGradientDef('gradientA', [
                    { offset: 0, color: '#FFD700' }, 
                    { offset: 100, color: '#FFFF00' },
                  ],
                  { gradientTransform: 'rotate(95 0.1 0.5)' }),
                ]}
                fill={[{ match: { id: 'valor' }, id: 'gradientA' }]}
                labelSkipHeight={12}
                borderRadius={4}
                axisBottom={{
                    legendOffset: 40,
                    tickRotation: -45,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    legend: 'Quantidade Registros',
                    legendOffset: -60,
                    legendPosition: 'middle',
                }}
                axisTop={{
                    legend: 'Regras',
                    legendOffset: -40,
                    legendPosition: 'start',
                    tickSize: 0,
                    tickPadding: 0,
                    tickRotation: 0,
                    tickValues: []
                }}
                margin={{ top: 50, right: 100, bottom: 120, left: 100 }}
                animate={true}
                motionConfig={{
                    mass: 1,
                    friction: 26,
                    tension: 120
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Cenário (Regra)</th>
                <th>Registros</th>
                <th>Representatividade (%)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const percentage = totalValue > 0 ? ((item.valor / totalValue) * 100).toFixed(1) : 0;
                return (
                  <tr key={item.regra}>
                    <td>{item.regra}</td>
                    <td>{item.valor}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
}
