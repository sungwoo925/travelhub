package com.travelhub.controller;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.TextSearchRequest;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;

@RestController
public class MapController {
    @Autowired
    private Environment env;

    @CrossOrigin(origins = "http://localhost:8888")
    @GetMapping("/maps/{locationName}")
    public String mapInfoString(@PathVariable String locationName) {
        try {
            return searchPlaces(locationName,env);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "error";
        }
    }

    private static String searchPlaces(String placeName,Environment env) throws Exception {
        String apiKey1 = env.getProperty("api.mapkey");

        GeoApiContext context = new GeoApiContext.Builder()
                                    .apiKey(apiKey1)
                                    .build();
        TextSearchRequest request = PlacesApi.textSearchQuery(context, placeName);
        PlacesSearchResponse response = request.await();

        JSONArray jsonArray = new JSONArray();
        for (PlacesSearchResult result : response.results) {
            JSONObject placeObject = new JSONObject();
            placeObject.put("name", result.name);
            placeObject.put("latitude", result.geometry.location.lat);
            placeObject.put("longitude", result.geometry.location.lng);
            jsonArray.put(placeObject);
        }
        return jsonArray.toString();
    }
    
}
