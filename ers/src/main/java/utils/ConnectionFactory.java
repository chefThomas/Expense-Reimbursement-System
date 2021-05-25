package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {

    private static final String ERS_URL = System.getenv("AWS_RDS_URL");
    private static final String ERS_UN = System.getenv("AWS_RDS_USER");
    private static final String ERS_PW = System.getenv("AWS_RDS_PASS");

    private static Connection conn;

    // public static void main(String[] args) {
    // getConnection();

    // System.out.println(getConnection());
    // }

    public static Connection getConnection() {
        String connection = ERS_URL + ":5432/postgres?user=" + ERS_UN + "&password=" + ERS_PW;

        try {
            Class.forName("org.postgresql.Driver");
            conn = DriverManager.getConnection(connection);
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println("******************************");
            System.out.println("ConnectionFactory Exception");
            System.out.println("******************************");
            e.printStackTrace();

        }
        return conn;
    }
}
