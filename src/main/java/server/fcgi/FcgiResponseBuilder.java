package server.fcgi;

import lombok.Builder;

import java.util.List;

@Builder
public class FcgiResponseBuilder implements FcgiResponse {
    private final Status status;
    private final List<String> headers;
    private final String body;

    public FcgiResponseBuilder(Status status, List<String> headers, String body) {
        this.status = status;
        this.headers = headers;
        this.body = body;
    }

    @Override
    public String buildResponse() {
        StringBuilder sb = new StringBuilder();
        sb.append("Status: ");
        sb.append(this.status.getCode());
        sb.append(" ");
        sb.append(this.status);
        sb.append("\n");

        this.headers.forEach(header -> sb.append(header).append("\n"));
        sb.append("\n");

        sb.append(this.body);
        return sb.toString();
    }
}
