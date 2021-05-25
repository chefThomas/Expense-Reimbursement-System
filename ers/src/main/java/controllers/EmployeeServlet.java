package controllers;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

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

@WebServlet(name = "employees", urlPatterns = { "/main/employees" })
public class EmployeeServlet extends HttpServlet {
    private UserService uService = new UserService();

    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

        // Cookies to protect the resource from non-managers
        Cookie[] cookies = req.getCookies();

        if (cookies != null) {
            // convert to ArrayList for methods
            List<Cookie> cookieList = Arrays.asList(cookies);

            // get userRole cookie
            Cookie result = cookieList.stream().filter(cookie -> cookie.getName().equals("userRole")).findAny()
                    .orElse(null);

            // check value (1 is manager)
            if (result.getValue().equals("1")) {
                // return employees
                List<User> emps = uService.getAllEmployees();
                res.setContentType("application/json;charset=UTF-8");
                ServletOutputStream jsonOut = res.getOutputStream();

                JsonConverter converter = new JsonConverter();
                String output = converter.convertEmpsToJson(emps);
                jsonOut.print(output);

            }

        }

    }
}
