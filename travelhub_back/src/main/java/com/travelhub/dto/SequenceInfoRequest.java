package com.travelhub.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SequenceInfoRequest {
    private short sequenceInfo;

    @JsonCreator    
    SequenceInfoRequest(@JsonProperty("sequence_info") Short sequenceInfo){
        this.sequenceInfo = sequenceInfo;
    }
    
    public short getSequenceInfo(){
        return sequenceInfo;
    }

    public void setSequenceInfo(short sequenceInfo) {
        this.sequenceInfo = sequenceInfo;
    }
}
