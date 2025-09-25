package server;

import com.google.gson.Gson;

public record Result(Double x, Double y, Double r, boolean hit, String currentTime, String time) {
    public String toJson(){
        Gson gson = new Gson();
        return gson.toJson(this);
    }
}
