# KTern Project Health Navigator Dashboard

![Dashboard Preview](https://media-hosting.imagekit.io/0233c9c5cfc14e3a/Screenshot%202025-05-03%20152449.png?Expires=1840874209&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DvK-ipQNiKri6NF-oWuKROITFBgKoMoF8TxGx0~Y2sm1BG-CFYJuokcJF-DEdY0NVUTYed9Bl5OaCPtMy8ObRD7CQQ09tnb53aRyroLqOS3FgfEBXDqt8-q4Sv2evZMuDgkR4aEC0DHHWHpFhTDXo3irwb-KybXQvdVmxbOAyij9Oi~LK52wRYn62sw5HLBZumjDTlZLAtZ7peg28CKdkCsxHIamWlx5rWAf2oHocAkj5VsbyQPbEPYPXnhgGw9TK413OEZNAZowMK5RweGpV-KRzLLqv5K7dUsIE0EvZMDONZ2YyGXjIYJO8O7aSxWtW~85-wNDttuApuDPaaNhig__)

A comprehensive project health monitoring dashboard for program managers, providing real-time insights into project performance, risks, and resource allocation.

**Live Demo**: [https://project-health-dashboard.vercel.app/](https://project-health-dashboard.vercel.app/)

## 🚀 Features

- **Executive Overview**: Critical performance metrics including Go-Live Risk Index, Schedule Performance, Milestone Adherence, and Resource Capacity
- **Timeline & Critical Path Visualization**: Interactive timeline with milestone tracking and critical path analysis
- **Project Management Discipline Metrics**: Dependency coverage, on-time delivery rate, plan recency, and baseline change tracking
- **Risk & Issue Management**: Risk exposure visualization, issue resolution efficiency, and approval bottleneck identification
- **AI-Powered Insights**: Smart analysis and recommendations for resolving project bottlenecks
- **Interactive Drilldowns**: Detailed views into the underlying data for all metrics

## 📋 Key KPIs

The dashboard includes these essential project health indicators:

- **Go-Live Risk Index**: Weighted score of factors affecting project delivery
- **Schedule Performance Index (SPI)**: Measures progress against planned schedule
- **Milestone Adherence Rate**: Tracks milestone completion against deadlines
- **Resource Capacity Gap**: Identifies resource overallocation
- **Dependency Coverage Rate**: Measures quality of task dependency relationships
- **On-Time Delivery Rate**: Percentage of tasks completed on schedule
- **Risk Mitigation Rate**: Effectiveness of risk management processes
- **Approval Cycle Efficiency**: Time required for approvals across stages
- **Issue Resolution Efficiency**: Speed of issue resolution

## 🛠️ Technology Stack

- React.js
- Tailwind CSS
- Headless UI
- Apache ECharts (via echarts-for-react)
- Heroicons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/siddheshthipse/project-health-dashboard.git
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧩 Project Structure

```
├── public/            # Static files
├── src/
│   ├── components/    # UI components
│   │   ├── dashboard/ # Dashboard card components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API service connections
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main application component
│   └── index.jsx      # Entry point
└── README.md
```

## 📊 Data Integration

The dashboard is designed to connect with MongoDB collections containing:

- Tasks
- Issues
- Risks
- Approvals/Signoffs 
- Milestones

Sample data is provided for demonstration purposes. In a production environment, update the API services in `src/services/` to connect with your data sources.

## 🔧 Customization

### Theming

The dashboard uses Tailwind CSS for styling. Customize the look and feel by modifying the `tailwind.config.js` file.

### Adding New KPIs

1. Create a new card component in `src/components/dashboard/`
2. Add the necessary data fetching in `src/services/`
3. Include the new component in the dashboard layout

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contact

For questions or support, please contact [siddheshthipse@gmail.com](mailto:siddheshthipse@gmail.com).

---

Built with ❤️ by KTern.AI team