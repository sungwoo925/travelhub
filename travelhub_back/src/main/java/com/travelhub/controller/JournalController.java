package com.travelhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelhub.dto.SequenceInfoRequest;
import com.travelhub.entity.Journal;
import com.travelhub.service.JournalService;

@RestController
@RequestMapping("/journals")
public class JournalController {

    @Autowired
    private JournalService journalService;

    @PostMapping
    public ResponseEntity<Journal> createJournal(@RequestBody Journal journal) {
        Journal savedJournal = journalService.createJournal(journal);
        return new ResponseEntity<>(savedJournal, HttpStatus.CREATED);
    }
    @PutMapping("/{journalId}")
    public ResponseEntity<Journal> updateJournal(@PathVariable Long journalId, @RequestBody Journal journal) {
        Journal updatedJournal = journalService.updateJournal(journalId, journal);
        return new ResponseEntity<>(updatedJournal, HttpStatus.OK);
    }
    @PutMapping("/{journalId}/sequence")
    public ResponseEntity<Journal> updateJournalSequences(@PathVariable Long journalId, @RequestBody SequenceInfoRequest sequenceInfoRequest) {
        Journal updatedJournal = journalService.updateJournalSequence(journalId, sequenceInfoRequest.getSequenceInfo());
        return new ResponseEntity<>(updatedJournal, HttpStatus.OK);
    }

    @GetMapping("/{journalId}")
    public ResponseEntity<Journal> getJournalById(@PathVariable Long journalId) {
        Journal journal = journalService.findJournalById(journalId);
        
        if (journal != null) {
            return new ResponseEntity<>(journal, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{journalId}")
    public ResponseEntity<Void> deleteJournal(@PathVariable Long journalId) {
        boolean deleted = journalService.deleteJournal(journalId);
        
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 삭제 성공
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 삭제할 여정이 없는 경우
        }
    }

    

}
