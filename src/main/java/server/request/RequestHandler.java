package server.request;

import com.fastcgi.FCGIInterface;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import lombok.extern.java.Log;
import server.response.Result;
import server.check.HitChecker;
import server.fcgi.ServerException;
import server.fcgi.Status;

import java.io.IOException;
import java.time.LocalTime;
import java.time.ZoneId;

@Log
public class RequestHandler {

    public static String handleJsonRequest() throws IOException {
        try {
            String body = readBody();
            Gson gson = new Gson();
            JsonObject json = gson.fromJson(body, JsonObject.class);

            double x = json.get("x").getAsDouble();
            double y = json.get("y").getAsDouble();
            double r = json.get("r").getAsDouble();

            log.info("Received %f %f %f".formatted(x, y, r));

            Long startTime = System.nanoTime();
            boolean hit = HitChecker.checkHit(x, y, r);
            Long endTime = System.nanoTime();

            Result result = Result.builder()
                    .x(x)
                    .y(y)
                    .r(r)
                    .hit(hit)
                    .currentTime(String.valueOf(LocalTime.now(ZoneId.of("Europe/Moscow")).withNano(0)))
                    .time(String.format("%.3f ms", (endTime - startTime) / 1_000_000.0))
                    .build();

            return result.toJson();

        } catch (NumberFormatException e) {
            throw new ServerException(Status.BAD_REQUEST, "Данные введены неверно");
        } catch (NullPointerException e) {
            throw new ServerException(Status.BAD_REQUEST, "Введите x, y, r");
        } catch (JsonParseException e){
            throw new ServerException(Status.BAD_REQUEST, "Данные переданы неверно");
        }
    }

    private static String readBody() throws IOException {
        int len = Integer.parseInt(FCGIInterface.request.params.getProperty("CONTENT_LENGTH", "0"));
        return len > 0 ? new String(System.in.readNBytes(len)) : "";
    }
}
