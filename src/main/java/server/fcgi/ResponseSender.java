package server.fcgi;

import server.JsonResponse;

public class ResponseSender {
    public static void sendJsonResponse(Status status, String body) {
        sendResponse(new JsonResponse(status, body));
    }

    public static void sendResponse(FcgiResponse fcgiResponse) {
        System.out.println(fcgiResponse.buildResponse());
    }

    //errors
}


