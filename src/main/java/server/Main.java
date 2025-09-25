package server;

import com.fastcgi.FCGIInterface;
import server.fcgi.ServerException;
import server.fcgi.Status;

import java.io.IOException;

import static server.request.RequestHandler.handleJsonRequest;
import static server.response.ResponseSender.*;


public class Main {
    public static void main(String[] args) {
        while (new FCGIInterface().FCGIaccept() >= 0) {

            String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");

            if (method.equals("POST")) {
                try {
                    String contentType = FCGIInterface.request.params.getProperty("CONTENT_TYPE");
                    if (contentType.equals("application/json")) {
                        String result = handleJsonRequest();
                        sendJsonResponse(Status.OK, result);
                    } else {
                        //че сюда вставить хз
                    }
                } catch (Exception e) {
                    sendError(new ServerException(Status.INTERNAL_SERVER_ERROR, e.getMessage()));
                }
            }
        }
    }
}
