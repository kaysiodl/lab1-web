package server.check;

import server.fcgi.ServerException;
import server.fcgi.Status;

import static server.response.ResponseSender.sendError;

public class HitChecker {
    private static final double MAX_VALUE = 5.0;
    private static final double MIN_VALUE = -3.0;

    public static boolean checkHit(double x, double y, double r) {
        if (!validateRange(x)){
            throw new ServerException(Status.BAD_REQUEST, "Значение х должно быть от -3 до 5!");
        }
        return ((x * x + y * y <= (r * r / 4)) && x >= 0 && y >= 0) || // sector
                (x >= 0 && x <= r && y >= -r && y <= 0) || //square
                ((y >= -x - (r / 2)) && x <= 0 && y <= 0); //triangle
    }

    public static boolean validateRange(Double value) {
        return value >= MIN_VALUE && value <= MAX_VALUE;
    }
}
