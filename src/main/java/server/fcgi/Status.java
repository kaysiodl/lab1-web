package server.fcgi;

public enum Status {
    OK(200),
    BAD_REQUEST(400),
    NOT_FOUND(404),
    INTERNAL_SERVER_ERROR(500);

    private final int code;
    Status(int code) {
        this.code = code;
    }

    @Override public String toString() {
        return this.name();
    }

    public int getCode() {
        return code;
    }
}
