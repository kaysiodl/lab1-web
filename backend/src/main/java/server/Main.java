package server;

import com.fastcgi.FCGIInterface;
import server.fcgi.ServerException;
import server.fcgi.Status;

import static server.request.RequestHandler.handleJsonRequest;
import static server.response.ResponseSender.sendError;
import static server.response.ResponseSender.sendJsonResponse;


public class Main {
    public static void main(String[] args) {
        while (new FCGIInterface().FCGIaccept() >= 0) {

            String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");

            if (!method.equals("POST")) {
                sendError(Status.NOT_ALLOWED, "Метод не поддерживается");
                continue;
            }

            try {
                String contentType = FCGIInterface.request.params.getProperty("CONTENT_TYPE");
                if (contentType.equals("application/json")) {
                    String result = handleJsonRequest();
                    sendJsonResponse(Status.OK, result);
                } else {
                    sendError(Status.BAD_REQUEST, "Данные переданы не в формате JSON");
                }
            } catch (ServerException e) {
                sendError(e.getStatus(), e.getMessage());
            } catch (Exception e) {
                sendError(Status.INTERNAL_SERVER_ERROR, e.getMessage());
            }
        }
    }
}
