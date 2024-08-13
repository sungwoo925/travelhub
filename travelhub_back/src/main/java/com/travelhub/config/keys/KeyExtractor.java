package com.travelhub.config.keys; // 패키지 선언 추가

import java.util.Base64;
import org.json.JSONObject;

public class KeyExtractor {
    public static void main(String[] args) {
        // Base64로 인코딩된 문자열
        String base64String = "MD8iMA0KBgkqPz8NCgEBAQUAAz8PADA/DQoCPwEAPz8/Pz9zDj8/PxcAPxUEAT8s" +
                              "IHQ/Pz94H09mPz8/Pz8/PxQSBGs/Jz8xPz9MPz8NCj8NCgk/fj8/JWM/Pz8/Pyo/" +
                              "P20TPx92P1k/P18/Pz8TPz8/aQNFT38/FT9uPzB0P1Q/Pz8/LGM/Pz8lPzU/PxdG" +
                              "cRxgP30/Pzk6Qho/dB0/KT8/aT8/Pz8/Fz8/XD9+Pz5hP2kePz97BD9+ZG9hP1cj" +
                              "Pz8/TBdrSDI/ElcCAwEAAQ0K";

        // Base64 디코딩
        byte[] decodedBytes = Base64.getDecoder().decode(base64String);

        // n과 e 추출 (여기서는 예시로 고정된 값 사용)
        String n = bytesToHex(decodedBytes); // n을 16진수 문자열로 변환
        String e = "AQAB"; // e는 일반적으로 65537로 설정됨

        // JSON 형식으로 저장
        JSONObject jwk = new JSONObject();
        jwk.put("kty", "RSA");
        jwk.put("n", n);
        jwk.put("e", e);

        // JSON 출력
        System.out.println(jwk.toString(4)); // 4는 들여쓰기
    }

    // 바이트 배열을 16진수 문자열로 변환하는 메서드
    private static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}