package controllers;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "logout", urlPatterns = { "/main/logout" })
public class LogoutServlet extends HttpServlet {

    // private UserService uService = new UserService();

    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

        PrintWriter out = res.getWriter();

        Cookie ck[] = req.getCookies();
        for (int i = 0; i < ck.length; i++) {
            System.out.print("Cookie Name: " + ck[i].getName() + " " + "Cookie Value: " + ck[i].getValue());
        }

        System.out.println("LOGOUT CALLED 1");

        res.setContentType("text/html");

        // unbake cookies
        Cookie userId = new Cookie("userId", "");
        Cookie userType = new Cookie("userRole", "");
        Cookie name = new Cookie("username", "");

        // make cookies stale
        userId.setMaxAge(0);
        userType.setMaxAge(0);
        name.setMaxAge(0);
        // package for delivery
        res.addCookie(userId);
        res.addCookie(userType);
        res.addCookie(name);

        System.out.println("LOGOUT CALLED 2");

        out.print("Log out successful");

    };
}
