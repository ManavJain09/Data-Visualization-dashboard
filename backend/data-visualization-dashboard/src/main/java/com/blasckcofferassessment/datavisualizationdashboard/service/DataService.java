package com.blasckcofferassessment.datavisualizationdashboard.service;

import com.blasckcofferassessment.datavisualizationdashboard.model.DataModel;
import com.blasckcofferassessment.datavisualizationdashboard.repository.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DataService {

    @Autowired
    private DataRepository dataRepository;

    @Autowired
    private MongoTemplate mongoTemplate;


    public DataModel addData(DataModel newData) {

        return dataRepository.save(newData);
    }


    public List<DataModel> getAllData() {
        return dataRepository.findAll();
    }

    public List<DataModel> getDataByEndYear(Integer endYear) {
        return dataRepository.findByEndYear(endYear);
    }


    public List<Integer> getendyears() {
        List<DataModel> allData = dataRepository.findAll();
        return allData.stream()
                .map(DataModel::getEndYear)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<String> getcity() {
        List<DataModel> allData = dataRepository.findAll();
        return allData.stream()
                .map(DataModel::getCity)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<String> getcountry() {
        List<DataModel> allData = dataRepository.findAll();
        return allData.stream()
                .map(DataModel::getCountry)
                .distinct()
                .collect(Collectors.toList());
    }


    public List<Integer> getstartyear() {
        List<DataModel> allData = dataRepository.findAll();
        return allData.stream()
                .map(DataModel::getStart_year)
                .distinct()
                .collect(Collectors.toList());
    }
}
