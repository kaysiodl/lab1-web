package server.response;

import server.fcgi.FcgiResponse;
import server.fcgi.ServerException;
import server.fcgi.Status;

public class ResponseSender {
    public static void sendJsonResponse(Status status, String body) {
        sendResponse(new JsonResponse(status, body));
    }

    public static void sendResponse(FcgiResponse fcgiResponse) {
        System.out.println(fcgiResponse.buildResponse());
    }

    public static void sendError(ServerException serverException) {
        sendJsonResponse(serverException.getStatus(), serverException.toJson());
    }
}


