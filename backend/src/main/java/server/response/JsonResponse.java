package server.response;

import server.fcgi.FcgiResponseBuilder;
import server.fcgi.Status;

import java.nio.charset.StandardCharsets;
import java.util.List;

public class JsonResponse {
    private final Status status;
    private final String body;

    public JsonResponse(Status status, String body) {
        this.status = status;
        this.body = body;
    }

    public String buildResponse() {
        FcgiResponseBuilder fcgiResponse = FcgiResponseBuilder
                .builder()
                .status(status)
                .headers(List.of("Content-Type: application/json",
                        "Content-Length: " + body.getBytes(StandardCharsets.UTF_8).length))
                .body(body)
                .build();
        return fcgiResponse.buildResponse();
    }
}
