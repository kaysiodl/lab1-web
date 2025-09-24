package server;

import com.fastcgi.FCGIInterface;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) {
        while (new FCGIInterface().FCGIaccept() >= 0) {

            String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");

            if (method.equals("POST")) {
                try {
                    String contentType = FCGIInterface.request.params.getProperty("CONTENT_TYPE");
                    if (contentType.equals("application/json")) {
                        handleJsonRequest();
                    } else {
                        //пока хз
                    }
                }catch (IOException e){

                }
            }
        }
    }

    private static void handleJsonRequest() throws IOException {
        String body = readBody();
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(body, JsonObject.class);
        double x = json.get("x").getAsDouble();
        double y = json.get("y").getAsDouble();
        double r = json.get("r").getAsDouble();
        checkHit(x, y, r);

    }

    private static String readBody() throws IOException {
        int len = Integer.parseInt(FCGIInterface.request.params.getProperty("CONTENT_LENGTH", "0"));
        return len > 0 ? new String(System.in.readNBytes(len)) : "";
    }

    private static boolean checkHit(double x, double y, double r) {
        return ((x * x + y * y <= (r * r / 4)) && x >= 0 && y >= 0) ||
                (x >= 0 && x <= r && y >= -r && y <= 0) ||
                ((y >= -x - (r / 2)) && x <= 0 && y <= 0);
    }


}
