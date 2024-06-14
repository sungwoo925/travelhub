package com.travelhub.service;

import com.travelhub.entity.Travel;
import com.travelhub.repository.TravelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TravelService {

    @Autowired
    private TravelRepository travelRepository;

    public List<Travel> searchByHashtag(List<String> hashtags) {
        return hashtags.stream()
                       .flatMap(hashtag -> travelRepository.findByHashtagContaining(hashtag).stream())
                       .distinct()
                       .collect(Collectors.toList());
    }

    public List<Travel> searchByTitle(String title) {
        return travelRepository.findByTravelTitleContaining(title);
    }

    public Optional<Travel> getTravel(Long travelId) {
        return travelRepository.findById(travelId);
    }

    public Travel createTravel(Travel travel) {
        return travelRepository.save(travel);
    }

    public Optional<Travel> updateTravel(Long travelId, Travel travelDetails) {
        return travelRepository.findById(travelId).map(travel -> {
            travel.setTravelTitle(travelDetails.getTravelTitle());
            travel.setHashtag(travelDetails.getHashtag());
            travel.setTravelStartDate(travelDetails.getTravelStartDate());
            travel.setTravelEndDate(travelDetails.getTravelEndDate());
            travel.setTravelShareOption(travelDetails.getTravelShareOption());
            travel.setTravelLocationName(travelDetails.getTravelLocationName());
            travel.setTravelLocationLatitude(travelDetails.getTravelLocationLatitude());
            travel.setTravelLocationLongitude(travelDetails.getTravelLocationLongitude());
            travel.setTravelText(travelDetails.getTravelText());
            travel.setLikeCount(travelDetails.getLikeCount());
            travel.setViewCount(travelDetails.getViewCount());
            travel.setSummary(travelDetails.getSummary());
            return travelRepository.save(travel);
        });
    }

    public Optional<Travel> updateTravelShareOption(Long travelId, String shareOption) {
        return travelRepository.findById(travelId).map(travel -> {
            travel.setTravelShareOption(Boolean.parseBoolean(shareOption));
            return travelRepository.save(travel);
        });
    }

    public boolean deleteTravel(Long travelId) {
        return travelRepository.findById(travelId).map(travel -> {
            travelRepository.delete(travel);
            return true;
        }).orElse(false);
    }
}
