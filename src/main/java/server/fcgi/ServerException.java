package server.fcgi;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
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

    public String toJson() {
        Gson gson = new Gson();
        JsonObject jsonObject = new JsonObject();

        jsonObject.addProperty("status", status.getCode());
        jsonObject.addProperty("message", this.getMessage());

        return gson.toJson(jsonObject);
    }

}
