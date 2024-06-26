import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data02 = [
  { name: "A1", value: 100, fill: "#00C49F" },
  { name: "A2", value: 300, fill: "#FFBB28" },
];

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            fill="fill"
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
