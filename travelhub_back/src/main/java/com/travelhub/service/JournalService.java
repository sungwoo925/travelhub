package com.travelhub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.travelhub.entity.Journal;
import com.travelhub.repository.JournalRepository;

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

}
