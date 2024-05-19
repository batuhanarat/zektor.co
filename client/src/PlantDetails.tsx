import React from 'react';

const PlantDetails: React.FC = () => {
  const developmentStages = [
    { stage: 1, name: 'Cotyledon', daysToHarvest: 52 },
    { stage: 2, name: 'Rosetta', daysToHarvest: 45 },
    { stage: 3, name: 'Heading', daysToHarvest: 20 },
    { stage: 4, name: 'Harvest', daysToHarvest: '-' },
  ];

  return (
    <div className="plant-details">
      <h2>Development Information</h2>
      <table>
        <thead>
          <tr>
            <th>Development Stage</th>
            <th>Development Stage Name</th>
            <th>Estimated Days to Harvest</th>
          </tr>
        </thead>
        <tbody>
          {developmentStages.map((stage, index) => (
            <tr key={index}>
              <td>{stage.stage}</td>
              <td>{stage.name}</td>
              <td>{stage.daysToHarvest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlantDetails;
