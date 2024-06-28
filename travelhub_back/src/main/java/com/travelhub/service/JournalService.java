package com.travelhub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public Journal updateJournal(Long journalId, Journal journalDetails) {
        Journal journal = journalRepository.findById(journalId)
                .orElseThrow(() -> new IllegalArgumentException("Journal not found with id: " + journalId));

        journal.setJournalText(journalDetails.getJournalText());
        journal.setJournalDate(journalDetails.getJournalDate());
        journal.setJournalLocationName(journalDetails.getJournalLocationName());
        journal.setJournalLocationLatitude(journalDetails.getJournalLocationLatitude());
        journal.setJournalLocationLongitude(journalDetails.getJournalLocationLongitude());
        journal.setPhotoLink(journalDetails.getPhotoLink());
        journal.setSequenceInfo(journalDetails.getSequenceInfo());

        return journalRepository.save(journal);
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
