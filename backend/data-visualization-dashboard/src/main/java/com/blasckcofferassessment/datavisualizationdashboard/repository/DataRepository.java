package com.blasckcofferassessment.datavisualizationdashboard.repository;

import com.blasckcofferassessment.datavisualizationdashboard.model.DataModel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DataRepository extends MongoRepository<DataModel, ObjectId> {
    List<DataModel> findByEndYear(int endYear);
}
