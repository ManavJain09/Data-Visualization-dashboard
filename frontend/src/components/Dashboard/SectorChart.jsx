import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';

const SectorChart = ({ data }) => {
  // Extract unique topics from the data
  const sectors = [...new Set(data.map(item => item.sector))];

  const chartData = {
    labels: sectors,
    datasets: [
      {
        data: sectors.map(sector => {
          // Find the relevance for each topic
          const relevantData = data.find(item => item.sector === sector);
          return relevantData ? relevantData.relevance : 0;
        }),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
        max: 5,
      },
    },
  };

  return (
    <Box
      borderRadius={20}
      pt={6}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      shadow="md"
      pb={100}
      maxHeight={700}
      overflow="hidden"
      marginLeft={"15px"}
      >
      <Heading as="h2" mb={4} marginLeft={"38px"}>
        Sector Chart
      </Heading>
      <PolarArea data={chartData} options={chartOptions} />
    </Box>
  );
};

export default SectorChart;
