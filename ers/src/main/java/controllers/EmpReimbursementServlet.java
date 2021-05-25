package controllers;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
// import javax.servlet.http.Cookie;
// import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import repository.models.Reimbursement;
import repository.models.User;
import services.ReimbursementService;
import utils.JsonConverter;

@WebServlet(name = "emp-reimbursement", urlPatterns = { "/main/emp-reimbursement" })
public class EmpReimbursementServlet extends HttpServlet {

    private ReimbursementService rService = new ReimbursementService();

    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

        // try get parameter
        String amount = req.getParameter("amount");
        String descr = req.getParameter("description");
        String empId = req.getParameter("empId");
        String typeId = req.getParameter("type");

        // add to db
        Reimbursement re = rService.addReimbursement(new Reimbursement(Double.parseDouble(amount), descr,
                Integer.parseInt(empId), Integer.parseInt(typeId)));
        // set output type for message
        res.setContentType("application/json;charset=UTF-8");
        ServletOutputStream jsonOut = res.getOutputStream();

        JsonConverter converter = new JsonConverter();
        String output = converter.convertToJson(re);
        jsonOut.print(output);

    }

    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
        // returns all of a single employees reimbursement reqs

        // the id of the employee whose requests we are after
        String id = null;

        // bite into cookies to see if the request is coming from a manager or employee
        Cookie[] cookies = req.getCookies();

        if (cookies != null) {
            // convert to ArrayList for methods
            List<Cookie> cookieList = Arrays.asList(cookies);

            // get userRole cookie
            Cookie result = cookieList.stream().filter(cookie -> cookie.getName().equals("userRole")).findAny()
                    .orElse(null);

            // if employee, get id from userId cookie
            if (result.getValue().equals("2")) {
                Cookie empId = cookieList.stream().filter(cookie -> cookie.getName().equals("userId")).findAny()
                        .orElse(null);
                System.out.println(empId.getValue());
                id = empId.getValue();
            } else {
                // if user making request if manager, the emp id will come as param
                id = req.getParameter("empId");
            }

        }

        User u = new User();
        u.setId(Integer.parseInt(id));
        List<Reimbursement> result = rService.getReimbursementsByEmployee(u);
        // set output type for message
        for (Reimbursement r : result) {
            System.out.println(r.getStatus());
        }
        res.setContentType("application/json;charset=UTF-8");
        ServletOutputStream jsonOut = res.getOutputStream();

        JsonConverter converter = new JsonConverter();
        String output = converter.convertToJson(result);
        jsonOut.print(output);

    }

};
