package com.vs.auth.dto;

public class AuthDtos {
    public static class SendOtpRequest {
        public String mobile;

        public String getMobile() { return mobile; }
        public void setMobile(String mobile) { this.mobile = mobile; }
    }

    public static class VerifyOtpRequest {
        public String mobile;
        public String code;

        public String getMobile() { return mobile; }
        public void setMobile(String mobile) { this.mobile = mobile; }
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
    }

    public static class AuthResponse {
        public String token;
        public String mobile;
        public String name;

        public AuthResponse() {}
        public AuthResponse(String token, String mobile, String name){ this.token = token; this.mobile = mobile; this.name = name; }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        public String getMobile() { return mobile; }
        public void setMobile(String mobile) { this.mobile = mobile; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }
}
