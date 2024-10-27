package com.travelhub.service;

import com.travelhub.dto.TravelDTO;
import com.travelhub.entity.Travel;
import com.travelhub.entity.User;
import com.travelhub.repository.TravelRepository;
import com.travelhub.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TravelService {

    @Autowired
    private TravelRepository travelRepository;
    private final UserRepository userRepository;

    public TravelService(TravelRepository travelRepository, UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<Travel> searchByHashtag(List<String> hashtags) {
        return hashtags.stream()
                       .flatMap(hashtag -> travelRepository.findByHashtagContaining(hashtag).stream())
                       .distinct()
                       .collect(Collectors.toList());
    }

    public List<Travel> searchByTitle(String title) {
        return travelRepository.findByTravelTitleContaining(title);
    }

    public List<Travel> searchByUserIdAndLocation(Integer userId, Double travelLocationLatitude) {
        return travelRepository.findByUserIdAndTravelLocationLatitude(userId, travelLocationLatitude);
    }

    public Optional<Travel> getTravel(Integer travelId) {
        return travelRepository.findByTravelId(travelId);
    }

    public Travel createTravel(Travel travel) {
        return travelRepository.save(travel);
    }

    public Optional<Travel> updateTravel(int travelId, Travel travelDetails) {
        return travelRepository.findByTravelId(travelId).map(travel -> {
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

    public Optional<Travel> updateTravelShareOption(int travelId, String shareOption) {
        return travelRepository.findByTravelId(travelId).map(travel -> {
            travel.setTravelShareOption(Boolean.parseBoolean(shareOption));
            return travelRepository.save(travel);
        });
    }

    public boolean deleteTravel(Integer travelId) {
        return travelRepository.findByTravelId(travelId).map(travel -> {
            travelRepository.delete(travel);
            return true;
        }).orElse(false);
    }

    public Travel findById(Integer travelId) {
        return travelRepository.findByTravelId(travelId)
                .orElse(new Travel()); 
    }

    public List<Travel> getAllTravels() {
        return travelRepository.findAll();
    }

    public List<TravelDTO> getTravelWithShareOption() {
        List<Travel> travels = travelRepository.findByTravelShareOption(true);

        HashMap<Integer, String> idNameMap = new HashMap<>();
        return travels.stream().map(travel -> {
            TravelDTO travelDTO = new TravelDTO(travel);
            int userId = travelDTO.getUserId();
            if (idNameMap.get(userId) != null) {
                travelDTO.setUsername(idNameMap.get(userId));
            } else {
                // userId로 User 정보 조회하여 userName을 설정
                userRepository.findByUserId(travel.getUserId()).ifPresent(user -> {
                    travelDTO.setUsername(user.getUserName());
                });
            }
            

            return travelDTO;
        }).collect(Collectors.toList());
    
    }

    public List<Travel> getTravelWithShareOptionNoName() {
        List<Travel> travels = travelRepository.findByTravelShareOption(true);
        return travels;
    }
}