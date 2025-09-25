package server.fcgi;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ServerException extends RuntimeException {
    Status status;

    public ServerException(Status status, String message) {
        super(message);
        this.status = status;
    }
}
