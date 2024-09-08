package com.travelhub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelhub.dto.JournalUpdateDTO;
import com.travelhub.entity.Journal;
import com.travelhub.repository.JournalRepository;

import jakarta.transaction.Transactional;

@Service
public class JournalService {

    @Autowired
    private JournalRepository journalRepository;

    public Journal createJournal(Journal journal) {
        return journalRepository.save(journal);
    }

    public JournalService(JournalRepository journalRepository) {
        this.journalRepository = journalRepository;
    }

    @Transactional
    public boolean updateJournal(Long journalId, JournalUpdateDTO journalUpdateDTO) {
        Journal journal = journalRepository.findById(journalId)
                .orElseThrow(() -> new IllegalArgumentException("저널을 찾을 수 없습니다. ID: " + journalId));

        // DTO의 값으로 저널 업데이트
        journal.setJournalDate(journalUpdateDTO.getJournalDate());
        journal.setJournalText(journalUpdateDTO.getJournalText());
        journal.setJournalLocationName(journalUpdateDTO.getJournalLocationName());
        journal.setJournalLocationLatitude(journalUpdateDTO.getJournalLocationLatitude());
        journal.setJournalLocationLongitude(journalUpdateDTO.getJournalLocationLongitude());
        journal.setWeather(journalUpdateDTO.getWeather());
        journal.setSequenceInfo(journalUpdateDTO.getSequenceInfo());

        journalRepository.save(journal); // 변경된 저널 저장
        return true; // 업데이트 성공
    }

    public Journal updateJournalSequence(Long journalId, short sequenceInfo) {
        Journal journal = journalRepository.findById(journalId)
                .orElseThrow(() -> new IllegalArgumentException("Journal not found with id: " + journalId));

        journal.setSequenceInfo(sequenceInfo);

        return journalRepository.save(journal);
    }

    public Journal findJournalById(Long journalId) {
        return journalRepository.findById(journalId)
                .orElse(null); // 없으면 null 반환
    }
    @Transactional
    public boolean deleteJournal(Long journalId) {
        // 여정 ID로 데이터베이스에서 여정을 찾아 삭제
        if (journalRepository.existsById(journalId)) {
            journalRepository.deleteById(journalId);
            return true; // 삭제 성공
        } else {
            return false; // 삭제할 여정이 없음
        }
    }

    

}
