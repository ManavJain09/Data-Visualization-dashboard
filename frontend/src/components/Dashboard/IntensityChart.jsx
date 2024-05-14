import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Heading, Select, Box, Flex, useColorMode } from '@chakra-ui/react';

const IntensityChart = ({ data }) => {
  const { colorMode } = useColorMode();
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [chartData, setChartData] = useState(null);
  const [years, setYears] = useState([]);

  // Fetch years from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/data/startyear");
        const data = await response.json();

        if (Array.isArray(data)) {
          // If the response is an array of years
          setYears(data); // Set years directly
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const filteredData = startYear && endYear
        ? data.filter(item => item.start_year >= startYear && item.start_year <= endYear)
        : data; // Use all data if no filters applied

      const intensityData = filteredData.map(item => item.intensity);

      if (filteredData.length) { // Check if data exists after filtering
        const uniqueYears = new Set(filteredData.map(item => item.start_year));
        const chartData = {
          labels: [...uniqueYears],
          datasets: [
            {
              label: 'Intensity',
              backgroundColor: intensityData.map(value => getColor(value, intensityData)),
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 1,
              data: intensityData,
            },
          ],
        };
        setChartData(chartData);
      } else {
        setChartData(null); // Set chart data to null if no data to display
      }
    }
  }, [data, startYear, endYear]);

  const getColor = (value, data) => {
    const colors = ['#7F00FF', '#F2B93B', '#FF8000', '#FF453A'];
    const threshold = Math.max(...data) / 4;
    if (value < threshold) {
      return colors[0];
    } else if (value < threshold * 2) {
      return colors[1];
    } else if (value < threshold * 3) {
      return colors[2];
    } else {
      return colors[3];
    }
  };

  const handleStartYearChange = (event) => {
    setStartYear(event.target.value);
  };

  const handleEndYearChange = (event) => {
    setEndYear(event.target.value);
  };

  return (
    <Box p={6} shadow="md" bg={colorMode === "light" ? "white" : "gray.700"} m={50}>
      <Flex direction="column" margin={'auto'}>
        <Heading as={"h2"} textAlign="left" mb={4}>
          Intensity Chart
        </Heading>
        <Flex mb={4}>
          <Select
            value={startYear}
            onChange={handleStartYearChange}
            mr={2}
            colorScheme="purple"
            className="custom-select" // Added for gap removal (optional)
          >
            <option value="">Start Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <Select
            value={endYear}
            onChange={handleEndYearChange}
            colorScheme="purple"
            className="custom-select" // Added for gap removal (optional)
          >
            <option value="">End Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Flex>
        <Box height="600px" width="100%">
          {chartData && <Bar data={chartData} options={{ plugins: { datalabels: { color: colorMode === "light" ? "black" : "white" }}}}/>}
        </Box>
      </Flex>
    </Box>
  );
};

export default IntensityChart;
