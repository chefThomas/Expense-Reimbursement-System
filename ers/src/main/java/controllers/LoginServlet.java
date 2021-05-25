package controllers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import repository.models.User;
import services.UserService;
import utils.JsonConverter;

@WebServlet(name = "login", urlPatterns = { "/login" })
public class LoginServlet extends HttpServlet {

    private UserService uService = new UserService();

    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

        // try get parameter
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        User user = uService.login(username, password);

        if (user != null) {
            // bake cookies
            Cookie userId = new Cookie("userId", String.valueOf(user.getId()));
            Cookie userType = new Cookie("userRole", String.valueOf(user.getRoleId()));
            Cookie name = new Cookie("username", String.valueOf(user.getUserName()));

            // package for delivery
            res.addCookie(userId);
            res.addCookie(userType);
            res.addCookie(name);

            // set output type for message
            res.setContentType("application/json;charset=UTF-8");
            ServletOutputStream jsonOut = res.getOutputStream();

            JsonConverter converter = new JsonConverter();
            String output = converter.convertToJson(user);
            jsonOut.print(output);

        } else {
            System.out.println("SOMETHING WENT WRONG while logging in");
        }

    };
}
