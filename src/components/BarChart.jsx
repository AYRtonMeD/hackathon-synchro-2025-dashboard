import { ResponsiveBar } from '@nivo/bar';
import { linearGradientDef } from '@nivo/core'

export default function BarChart() {
    const data = [
    {
      "regra": "Lei1",
      "valor": 10
    },
    {
      "regra": "Lei2",
      "valor": 50
    },
    {
      "regra": "Lei3",
      "valor": 20
    },
        {
      "regra": "Lei4",
      "valor": 20
    },
        {
      "regra": "Lei5",
      "valor": 20
    },
            {
      "regra": "Lei6",
      "valor": 20
    },
    {
          "regra": "Lei7",
      "valor": 20
    },
    {
          "regra": "Lei8",
      "valor": 20
    },
  ];
  return (
     <ResponsiveBar /* or Bar for fixed dimensions */
        data={data}
        indexBy="regra"
        keys={["valor"]}
        layout="horizontal"
        enableGridX
        enableGridY={false}
        labelSkipWidth={12}
        labelTextColor="white"
        //padding={0.6}
        defs={[
          linearGradientDef('gradientA', [
            { offset: 0, color: '#2f0b37' },
            { offset: 100, color: '#7338a0' },
          ],
          {
            gradientTransform: 'rotate(95 0.1 0.5)'
          }),
      ]}
      fill={[
        { match: { id: 'valor' }, id: 'gradientA' }
      ]}
        labelSkipHeight={12}
        borderRadius={10}
        axisBottom={{ legend: 'Quantidade Registros', legendOffset: 40 }}
        axisLeft={{ legend: 'Regras', legendOffset: -50 }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    />
  )
}

