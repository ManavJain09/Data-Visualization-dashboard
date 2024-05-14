package com.blasckcofferassessment.datavisualizationdashboard.controller;

import com.blasckcofferassessment.datavisualizationdashboard.model.DataModel;
import com.blasckcofferassessment.datavisualizationdashboard.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/data")
public class DataController {
    @Autowired
    private DataService dataService;

    @GetMapping
    public ResponseEntity<List<DataModel>> getAllData() {
        return new ResponseEntity<List<DataModel>>(dataService.getAllData(), HttpStatus.OK);
    }

    @PostMapping("/addData")
    public DataModel addData(@RequestBody DataModel newData) {
        return dataService.addData(newData);
    }

    @GetMapping("/{endYear}")
    public ResponseEntity<List<DataModel>> getDataByEndYear(@PathVariable Integer endYear) {
        return new ResponseEntity<>(dataService.getDataByEndYear(endYear), HttpStatus.OK);
    }

    @GetMapping("/endyear")
    public List<Integer> getendyears(){
        return dataService.getendyears();
    }
    @GetMapping("/countries")
    public List<String> getcountry(){
        return dataService.getcountry();
    }
    @GetMapping("/startyear")
    public List<Integer>  getpestle(){
        return dataService.getstartyear();
    }
}
